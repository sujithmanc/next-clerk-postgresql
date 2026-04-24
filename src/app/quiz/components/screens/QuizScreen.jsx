"use client";
import { useQuizStore } from "../../store/useQuizStore";
import QuestionCard from "../ui/QuestionCard";
import ProgressBar from "../ui/ProgressBar";
import Button from "../ui/Button";

export default function QuizScreen() {
  const {
    questions,
    currentIndex,
    selectAnswer,
    answers,
    next,
    submit
  } = useQuizStore();

  const q = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (
    <div>
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      <div className="mt-4">
        <QuestionCard
          q={q}
          selected={answers[currentIndex]}
          onSelect={selectAnswer}
        />
      </div>
      <Button onClick={isLast ? submit : next}>
        {isLast ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
