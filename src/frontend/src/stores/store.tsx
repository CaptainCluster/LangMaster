import { create } from "zustand";
import Quiz from "../models/quiz/Quiz";
import Question from "../models/quiz/Question";
import Answer from "../models/quiz/Answer";

interface Application {
  currentPageName: string;
  currentQuiz: Quiz;
  updateCurrentPageName: (pageName: string) => void;
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
      questions: quiz.questions,
    }));
  },

  // Updating with a Question object
  pushQuestion: (question: Question) => {
    set((state) => ({
      currentQuiz: {
        ...state.currentQuiz,
        questions: [...state.currentQuiz.questions, question],
      },
    }));
  },

  // Pushing an Answer object inside a Question object
  pushAnswer: (questionTitle: string, answer: Answer) => {
    set((state) => {
      const questionIndex = state.currentQuiz.questions.findIndex(
        (q) => q.title === questionTitle
      );
      // If changes are
      if (questionIndex === -1) {
        return state;
      }
      return {
        currentQuiz: {
          ...state.currentQuiz,
          questions: state.currentQuiz.questions.map((q, i) =>
            i === questionIndex ? { ...q, answers: [...q.answers, answer] } : q
          ),
        },
      };
    });
  },
}));

export default useStore;
