## Connection Pooling in Supabase

### The Problem Without Pooling

Every time your app makes a DB request, it opens a **raw TCP connection** to PostgreSQL. PostgreSQL has a hard limit on simultaneous connections (Supabase free tier: **~60 connections**).

On Vercel, every serverless function invocation can spin up its own connection. With traffic, you'll hit:
```
Error: too many connections for role "postgres"
```

Pooling solves this.

---

### PgBouncer (What Supabase Uses)

Supabase runs **PgBouncer** as a middleware between your app and the actual PostgreSQL server.

```
Your App → PgBouncer → PostgreSQL
```

PgBouncer maintains a **small pool of real DB connections** and reuses them across many app requests.

---

### Transaction Pooler (Port 6543)

```
App Request 1 ──┐
App Request 2 ──┤→ PgBouncer → [conn1, conn2, conn3] → PostgreSQL
App Request 3 ──┘
```

- A real DB connection is borrowed **only for the duration of one transaction**
- Once the transaction ends, the connection is **returned to the pool immediately**
- 1000 app connections can share just 10 real DB connections
- **Perfect for serverless** (Vercel, AWS Lambda) because functions are short-lived

**Limitations:**
- ❌ No prepared statements (`prepare: false` required)
- ❌ No `SET` session variables
- ❌ No advisory locks
- ❌ Drizzle Kit hangs (it needs a persistent session)

---

### Session Pooler (Port 5432)

```
App Request 1 ──→ PgBouncer → conn1 (held for entire session)
App Request 2 ──→ PgBouncer → conn2 (held for entire session)
App Request 3 ──→ PgBouncer → conn3 (held for entire session)
```

- A real DB connection is held for the **entire session** (until you disconnect)
- More like a direct connection, just with PgBouncer in front
- Supports prepared statements, session variables, advisory locks
- **Good for long-lived servers** (traditional Node.js servers, not serverless)

**Why Drizzle Kit works here:**
- `drizzle-kit push/pull/migrate` connects once, inspects schema, runs DDL, disconnects
- It needs a **stable session** — Transaction Pooler drops the connection between transactions so Kit gets confused and hangs

---

### Direct Connection (No Pooler)

```
Your App ──→ PostgreSQL (direct, no middleware)
```

- Bypasses PgBouncer entirely
- Full PostgreSQL feature support
- **Limited connections** — each connection is a real OS process on the DB server
- Fine for local dev or one-off scripts, dangerous at scale

---

### Summary Table

| | Transaction Pooler | Session Pooler | Direct |
|---|---|---|---|
| **Port** | 6543 | 5432 | 5432 |
| **Connection held** | Per transaction | Per session | Per session |
| **Max app connections** | Very high | Medium | Low (~60) |
| **Prepared statements** | ❌ | ✅ | ✅ |
| **Vercel/Serverless** | ✅ Best choice | ⚠️ Wastes connections | ❌ Risky |
| **Drizzle Kit** | ❌ Hangs | ✅ Works | ✅ Works |
| **Runtime `db` client** | ✅ | ✅ | ✅ |

---

### Your Setup (Recap)

```
Vercel Serverless Functions  →  Transaction Pooler (6543)  →  PostgreSQL
Drizzle Kit (local machine)  →  Session Pooler (5432)      →  PostgreSQL
```