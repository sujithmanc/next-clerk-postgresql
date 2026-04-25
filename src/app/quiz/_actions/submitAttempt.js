"use server";

import { auth } from "@clerk/nextjs/server";
import { getAttempt, saveAttempt } from "@/app/quiz/_services/attemptService";
import { scoreCalc } from "@/app/quiz/_lib/scoreCalc";

/**
 * Calculates score and saves the attempt.
 * Score is never returned to the client.
 * @param {string} quizId
 * @param {Array}  questions  - full question objects with answerIndex
 * @param {Record<string, number>} answers - questionId -> selected index
 * @returns {{ success: boolean }|{ error: string }}
 */
export async function submitAttempt(quizId, questions, answers) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthenticated" };
  }

  const existing = await getAttempt(userId, quizId);
  if (existing) {
    return { success: true, alreadyAttempted: true };
  }

  const score = await scoreCalc(questions, answers);
  await saveAttempt(userId, quizId, score);

  return { success: true };
}
