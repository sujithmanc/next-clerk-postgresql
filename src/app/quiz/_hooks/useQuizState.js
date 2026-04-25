"use client";

import { useState, useCallback } from "react";

/**
 * Manages quiz progression state.
 * @param {Array} questions
 */
export function useQuizState(questions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]           = useState({});
  const [submitted, setSubmitted]       = useState(false);

  const currentQuestion = questions[currentIndex] ?? null;
  const isLast          = currentIndex === questions.length - 1;
  const isAnswered      = answers[currentQuestion?.id] !== undefined;

  const selectAnswer = useCallback((questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const next = useCallback(() => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  }, [isLast]);

  const submit = useCallback(() => {
    setSubmitted(true);
  }, []);

  return {
    currentIndex,
    currentQuestion,
    answers,
    submitted,
    isLast,
    isAnswered,
    selectAnswer,
    next,
    submit,
  };
}
