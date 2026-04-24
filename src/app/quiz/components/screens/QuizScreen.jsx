"use client";
import { useQuizStore } from "../../store/useQuizStore";
import { ChevronRight, Send } from "lucide-react";

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
  const selected = answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const total = questions.length;
  const progress = ((currentIndex + 1) / total) * 100;

  if (!q) return null;

  return (
    <div className="min-h-screen flex flex-col bg-base-200">

      {/* Header */}
      <div className="p-4 bg-base-100 shadow-sm sticky top-0 z-10">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">
            Question {currentIndex + 1}
          </span>
          <span className="text-base-content/70">
            {currentIndex + 1} / {total}
          </span>
        </div>
        <progress
          className="progress progress-primary w-full"
          value={progress}
          max="100"
        />
      </div>

      {/* Question Area */}
      <div className="flex-1 p-4">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            
            {/* Question */}
            <h2 className="text-lg font-semibold mb-4">
              {q.question}
            </h2>

            {/* Options */}
            <div className="flex flex-col gap-2">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`btn justify-start text-left ${
                    selected === i
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 bg-base-100 border-t">
        <button
          disabled={selected === undefined}
          onClick={isLast ? submit : next}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLast ? (
            <>
              Submit <Send size={18} />
            </>
          ) : (
            <>
              Next <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}