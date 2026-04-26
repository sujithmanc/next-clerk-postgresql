# Your Supabase Setup

Vercel Serverless Functions  →  Transaction Pooler (6543)  →  PostgreSQL
Drizzle Kit (local machine)  →  Session Pooler (5432)      →  PostgreSQL

# Supabase Connection Error!

```

{
  "query": "select \"slug\" from \"quizzes\"",
  "params": [],
  "cause": {
    "errno": -3008,
    "code": "ENOTFOUND",
    "syscall": "getaddrinfo",
    "hostname": "aws-1-ap-south-1.pooler.supabase.com"
  }
}
```