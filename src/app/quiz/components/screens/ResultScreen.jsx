"use client";
import { useQuizStore } from "../../store/useQuizStore";
import Button from "../ui/Button";

export default function ResultScreen() {
  const { score, questions, user, restart } = useQuizStore();

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="text-xl font-bold mb-2">
        Congrats {user.name} 🎉
      </h2>
      <p className="mb-4">
        You scored {score} / {questions.length}
      </p>
      <Button onClick={restart}>Try Again</Button>
    </div>
  );
}
