"use client";
import { useQuizStore } from "../../store/useQuizStore";
import { Trophy, RotateCcw } from "lucide-react";

export default function ResultScreen() {
  const { score, questions, user, restart } = useQuizStore();

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl text-center">
        
        {/* Header */}
        <div className="card-body items-center">
          
          {/* Icon */}
          <div className="bg-primary/10 p-4 rounded-full mb-3">
            <Trophy className="text-primary" size={32} />
          </div>

          {/* Title */}
          <h2 className="card-title text-2xl font-bold">
            Congrats {user.name} 🎉
          </h2>

          {/* Score Badge */}
          <div className="badge badge-primary badge-lg mt-2">
            {score} / {total}
          </div>

          {/* Percentage */}
          <p className="text-sm text-base-content/70 mt-1">
            You scored {percentage}% correct answers
          </p>

          {/* Progress */}
          <progress
            className="progress progress-primary w-full mt-4"
            value={percentage}
            max="100"
          />

          {/* Feedback message */}
          <p className="mt-3 text-sm">
            {percentage === 100 && "Perfect score! 🔥"}
            {percentage >= 70 && percentage < 100 && "Great job! 💪"}
            {percentage >= 40 && percentage < 70 && "Good effort 👍"}
            {percentage < 40 && "Keep practicing 🚀"}
          </p>

          {/* Actions */}
          <div className="card-actions w-full mt-4">
            <button
              className="btn btn-primary w-full flex items-center gap-2"
              onClick={restart}
            >
              <RotateCcw size={18} />
              Try Again
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
