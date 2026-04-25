import db from "@/index";
import { attempts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";

/**
 * Checks if a user has already attempted a quiz.
 * @param {string} userId
 * @param {string} quizId
 * @returns {object|null}
 */
export async function getAttempt(userId, quizId) {
  const result = await db
    .select()
    .from(attempts)
    .where(and(eq(attempts.userId, userId), eq(attempts.quizId, quizId)))
    .limit(1);

  return result[0] ?? null;
}

/**
 * Saves a new attempt to the DB.
 * @param {string} userId
 * @param {string} quizId
 * @param {number} score
 */
export async function saveAttempt(userId, quizId, score) {
  await db.insert(attempts).values({
    id:    randomUUID(),
    userId,
    quizId,
    score,
  });
}
