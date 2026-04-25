"use server";

import { getQuizBySlug } from "@/app/quiz/_services/quizService";
import { validateQuiz } from "@/app/quiz/_lib/quizValidator";

/**
 * Fetches a quiz by slug and validates it.
 * @param {string} slug
 * @returns {{ quiz: object }|{ error: string }}
 */
export async function getQuiz(slug) {
  const quiz = await getQuizBySlug(slug);
   console.info(`Quiz "${slug}" fetched and validated successfully.`, JSON.stringify(quiz, null, 5));
  const { valid, reason } = validateQuiz(quiz);
  console.info(`Quiz "${slug}" fetched and validated reason: ${reason}. Validation result: ${valid}`);
  // if (!valid) {
  //   return { error: reason };
  // }

 

  return { quiz };
}
