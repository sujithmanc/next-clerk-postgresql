"use server";

import { currentUser } from "@clerk/nextjs/server";
import { upsertUser } from "@/app/quiz/_services/userService";

/**
 * Lazy-syncs the current Clerk user into the DB.
 * Call this at the top of any protected page.
 * @returns {object} clerkUser
 */
export async function syncUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthenticated");
  }

  await upsertUser(clerkUser);

  return clerkUser;
}
