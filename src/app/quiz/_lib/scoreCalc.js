"use server";

/**
 * Calculates score from user answers vs correct answers.
 * @param {Array<{ id: string, answerIndex: number }>} questions - quiz questions with correct answerIndex
 * @param {Record<string, number>} answers - map of questionId -> selected option index
 * @returns {number} score count (correct answers)
 */
export async function scoreCalc(questions, answers) {
  if (!questions?.length || !answers) return 0;

  return questions.reduce((score, question) => {
    const selected = answers[question.id];
    if (selected === undefined || selected === null) return score;
    return selected === question.answerIndex ? score + 1 : score;
  }, 0);
}
