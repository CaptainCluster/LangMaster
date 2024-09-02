import { create } from "zustand";
import { persist } from "zustand/middleware";

/*
interface Application {
  import Quiz from "../models/quiz/Quiz";
  currentPageName: string;
  currentQuiz: Quiz;
  updateCurrentPageName: (pageName: string) => void;
  updateQuiz: (quiz: Quiz) => void;
}
*/

interface UseStoreState {
  currentPageName: string;
}

const useStore = create(
  persist(
    (set) => ({
      currentPageName: "",

      updateCurrentPageName: (pageName: string) =>
        set((state: UseStoreState) => ({
          ...state,
          currentPageName: pageName,
        })),
    }),
    {
      name: "use-storage",
    }
  )
);

export default useStore;
