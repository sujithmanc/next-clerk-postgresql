export function calculateScore(questions, answers) {
  let score = 0;
  questions.forEach((q, index) => {
    if (answers[index] === q.answer) score++;
  });
  return score;
}
