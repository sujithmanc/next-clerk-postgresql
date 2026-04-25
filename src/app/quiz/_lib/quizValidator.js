"use server";

/**
 * Validates that a quiz is safe to serve to a user.
 * @param {object|null} quiz
 * @returns {{ valid: boolean, reason?: string }}
 */
export async function validateQuiz(quiz) {
  if (!quiz) {
    return { valid: false, reason: "Quiz not found." };
  }

  if (!quiz.isPublished) {
    return { valid: false, reason: "This quiz is not available." };
  }

  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    return { valid: false, reason: "This quiz has no questions." };
  }

  for (const q of quiz.questions) {
    if (
      !q.id ||
      !q.question ||
      !Array.isArray(q.options) ||
      q.options.length < 2 ||
      typeof q.answerIndex !== "number"
    ) {
      return { valid: false, reason: "Quiz contains malformed questions." };
    }
  }

  return { valid: true };
}
