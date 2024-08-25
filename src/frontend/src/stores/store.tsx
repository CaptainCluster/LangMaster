import { create } from "zustand";
import Quiz from "../models/quiz/Quiz";

interface Application {
  currentPageName: string;
  currentQuiz: Quiz;
  updateCurrentPageName: (newPage: string) => void;
  updateQuiz: (quiz: Quiz) => void;
}

const useStore = create<Application>((set) => ({
  currentPageName: "",
  currentQuiz: { title: "", questions: [] },

  updateCurrentPageName: (pageName: string) =>
    set((state) => ({
      ...state,
      currentPageName: pageName,
    })),

  updateQuiz: (quiz: Quiz) => {
    set((state) => ({
      ...state,
      currentQuiz: quiz,
    }));
  },
}));

export default useStore;
