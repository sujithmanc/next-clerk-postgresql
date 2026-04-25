"use client";
import { useQuizStore } from "../../store/useQuizStore";
import RegisterScreen from "../screens/RegisterScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";

export default function QuizFlow() {
  const screen = useQuizStore((s) => s.screen);

  if (screen === "register") return <RegisterScreen />;
  if (screen === "quiz") return <QuizScreen />;
  return <ResultScreen />;
}
