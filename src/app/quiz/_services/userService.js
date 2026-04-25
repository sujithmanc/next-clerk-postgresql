import db from "@/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Upserts a user into the DB using Clerk data.
 * @param {{ id: string, fullName: string, emailAddresses: Array, imageUrl: string }} clerkUser
 */
export async function upsertUser(clerkUser) {
  const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? "";
  await db
    .insert(users)
    .values({
      id: clerkUser.id,
      name: clerkUser.fullName ?? "Anonymous",
      email,
      imageUrl: clerkUser.imageUrl ?? null,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        name: clerkUser.fullName ?? "Anonymous",
        email,
        imageUrl: clerkUser.imageUrl ?? null,
      },
    });
}

/**
 * Fetches a user by clerkId.
 * @param {string} clerkId
 */
export async function getUserById(clerkId) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, clerkId))
    .limit(1);

  return result[0] ?? null;
}
