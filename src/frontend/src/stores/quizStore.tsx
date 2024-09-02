/**
 * @purpose Zustand state management
 *
 * @dependencies
 * 1) Zustand for state management
 * 2) Zustand persist middleware for persistent state
 *
 * This file manages global state for quiz creation.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Answer from "../models/quiz/Answer";
import Question from "../models/quiz/Question";
import Quiz from "../models/quiz/Quiz";

interface QuizStoreState {
  quizId: number | undefined;
  currentQuiz: Quiz;

  setQuizId: (id: number) => void;
  updateQuiz: (quiz: Quiz) => void;
  pushQuestion: (question: Question) => void;
  pushAnswer: (questionTitle: string, answer: Answer) => void;
}

const quizStore = create<QuizStoreState>()(
  persist(
    (set) => ({
      quizId: undefined,
      currentQuiz: { title: "", questions: [] },

      /**
       * The following functionality below manages the Quiz creation/customization
       * data as a buffer-ish solution, allowing it to be easily sent when the
       * client wishes to do so.
       */

      setQuizId: (id: number) => set({ quizId: id }),

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
            (questionEntry: Question) => questionEntry.title === questionTitle
          );
          // If the question does not exist, no changes are made
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
