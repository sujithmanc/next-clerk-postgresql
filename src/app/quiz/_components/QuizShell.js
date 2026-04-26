"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { useQuizState } from "../_hooks/useQuizState";
import { submitAttempt } from "../_actions/submitAttempt";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

export default function QuizShell({ quiz, slug }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    currentIndex,
    currentQuestion,
    answers,
    isLast,
    isAnswered,
    selectAnswer,
    next,
  } = useQuizState(quiz.questions);

  async function handleNext() {
    if (isLast) {
      startTransition(async () => {
        await submitAttempt(quiz.id, quiz.questions, answers);
        router.push(`/quiz/${slug}/result`);
      });
    } else {
      next();
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">

      {/* Top Progress */}
      <div className="px-4 pt-6">
        <ProgressBar current={currentIndex} total={quiz.questions.length} />

        {/* Question count */}
        <p className="text-xs opacity-60 mt-2 text-center">
          Question {currentIndex + 1} of {quiz.questions.length}
        </p>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-start justify-center px-4 pt-6">
        <div className="w-full max-w-2xl">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <QuestionCard
                question={currentQuestion}
                selectedIndex={answers[currentQuestion.id]}
                onSelect={selectAnswer}
              />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 w-full px-4 pb-6 pt-3 bg-base-200/80 backdrop-blur">

        <button
          onClick={handleNext}
          disabled={!isAnswered || isPending}
          className="btn btn-primary w-full gap-2 disabled:opacity-40"
        >
          {isPending ? (
            "Submitting..."
          ) : isLast ? (
            <>
              Submit <Check size={16} />
            </>
          ) : (
            <>
              Next <ArrowRight size={16} />
            </>
          )}
        </button>

      </div>

    </div>
  );
}