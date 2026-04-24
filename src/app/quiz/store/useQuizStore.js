import { create } from "zustand";
import { questions as baseQuestions } from "../data/questions";
import { shuffle } from "../utils/shuffle";
import { calculateScore } from "../utils/calculateScore";

export const useQuizStore = create((set, get) => ({
  screen: "register",
  user: { name: "", phone: "" },
  questions: [],
  currentIndex: 0,
  answers: {},
  score: 0, 

  startQuiz: (user) => {
    const shuffled = shuffle(baseQuestions);
    set({
      user,
      questions: shuffled,
      screen: "quiz",
      currentIndex: 0,
      answers: {},
      score: 0
    });
  },

  selectAnswer: (optionIndex) => {
    const { currentIndex, answers } = get();
    set({
      answers: { ...answers, [currentIndex]: optionIndex }
    });
  },

  next: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  submit: () => {
    const { questions, answers } = get();
    const score = calculateScore(questions, answers);
    set({ score, screen: "result" });
  },

  restart: () => set({ screen: "register" })
}));
