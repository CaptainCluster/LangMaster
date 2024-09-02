/**
 * @purpose Zustand state management
 *
 * This file manages global state for quiz creation.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Answer from "../models/quiz/Answer";
import Question from "../models/quiz/Question";
import Quiz from "../models/quiz/Quiz";

/*
interface QuizStoreInterface {
  quizName: string;
  quizId: number | undefined;

  updateQuizName: (quiz: string) => void;
  updateQuizId: (id: number) => void;

  currentQuiz: { title: ""; questions: [] };
}
*/

interface QuizStoreState {
  quizId: number | undefined;
  currentQuiz: {
    title: string;
    questions: Question[];
  };
}

const quizStore = create(
  persist(
    (set) => ({
      quizId: undefined,
      updateQuizId: (id: number) => set({ quizId: id }),

      /**
       * The following functionality below manages the Quiz creation/customization
       * data as a buffer-ish solution, allowing it to be easily sent when the
       * client wishes to do so.
       */

      // Updating the state of the currently stored quiz
      updateQuiz: (quiz: Quiz) => {
        set((state: QuizStoreState) => ({
          ...state,
          currentQuiz: quiz,
        }));
      },

      // Updating with a Question object
      pushQuestion: (question: Question) => {
        set((state: QuizStoreState) => ({
          currentQuiz: {
            ...state.currentQuiz,
            questions: [...state.currentQuiz.questions, question],
          },
        }));
      },
      // Pushing an Answer object inside a Question object
      pushAnswer: (questionTitle: string, answer: Answer) => {
        set((state: QuizStoreState) => {
          const questionIndex = state.currentQuiz.questions.findIndex(
            (q: Question) => q.title === questionTitle
          );
          // If the question does not exist, returning with current state
          if (questionIndex === -1) {
            return state;
          }
          // Returning with the Answer pushed to an array within the correct
          // Question object
          return {
            currentQuiz: {
              ...state.currentQuiz,
              questions: state.currentQuiz.questions.map((q, i) =>
                i === questionIndex
                  ? { ...q, answers: [...q.answers, answer] }
                  : q
              ),
            },
          };
        });
      },
    }),
    {
      name: "quiz-storage",
    }
  )
);

export default quizStore;
