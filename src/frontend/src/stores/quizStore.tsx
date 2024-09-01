/**
 * @purpose Zustand state management
 *
 * This file manages global state for quiz creation.
 */

import { create } from "zustand";

interface QuizStoreInterface {
  quizName: string;
  quizId: number | undefined;

  updateQuizName: (quiz: string) => void;
  updateQuizId: (id: number) => void;
}

const quizStore = create<QuizStoreInterface>((set) => ({
  quizName: "",
  quizId: undefined,

  updateQuizName: (quiz: string) => set({ quizName: quiz }),

  updateQuizId: (id: number) => set({ quizId: id }),
}));

export default quizStore;
