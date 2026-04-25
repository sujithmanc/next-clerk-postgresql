"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";

import { useQuizState } from "../_hooks/useQuizState";
import { submitAttempt } from "../_actions/submitAttempt";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

/**
 * @param {object} quiz      - full quiz object from DB
 * @param {string} slug      - quiz slug for redirect
 */
export default function QuizShell({ quiz, slug }) {
  const router              = useRouter();
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
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-10 pb-20">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <ProgressBar current={currentIndex} total={quiz.questions.length} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <QuestionCard
              question={currentQuestion}
              selectedIndex={answers[currentQuestion.id]}
              onSelect={selectAnswer}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          disabled={!isAnswered || isPending}
          className="mt-8 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-indigo-700 active:scale-95 transition-all duration-200"
        >
          {isPending ? "Submitting..." : isLast ? "Submit" : "Next"}
        </button>

      </div>
    </div>
  );
}
