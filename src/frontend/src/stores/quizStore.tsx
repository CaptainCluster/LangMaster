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

import QuestionState from "../models/state/QuestionState";
import AnswerState from "../models/state/AnswerState";

interface QuizStoreState {
  quizId: number | undefined;
  currentQuiz: Quiz;

  setQuizId: (id: number) => void;
  updateQuiz: (quiz: Quiz) => void;
  updateExistingQuestion: (questionState: QuestionState) => void;
  pushQuestion: (question: Question) => void;
  pushAnswer: (questionTitle: string, answer: Answer) => void;
  updateExistingAnswer: (answerState: AnswerState) => void;
  resetStore: () => void;
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

      /**
       * An update to an existing Question. Uses its index to pinpoint
       * which object to change and uses the title in the QuestionState
       * object to overwrite the former title.
       */
      updateExistingQuestion: (questionState: QuestionState) => {
        set((state: QuizStoreState) => {
          if (state.currentQuiz.questions[questionState.index] === undefined) {
            const newQuestion: Question = {
              title: questionState.title,
              answers: [],
            };
            return {
              currentQuiz: {
                ...state.currentQuiz,
                questions: [...state.currentQuiz.questions, newQuestion],
              },
            };
          }
          return {
            currentQuiz: {
              ...state.currentQuiz,
              questions: state.currentQuiz.questions.map(
                (questionEntry, index) =>
                  index === questionState.index
                    ? { ...questionEntry, title: questionState.title }
                    : questionEntry
              ),
            },
          };
        });
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

      updateExistingAnswer: (answerState: AnswerState) => {
        set((state: QuizStoreState) => {
          return {
            currentQuiz: {
              ...state.currentQuiz,
              questions: state.currentQuiz.questions.map((q, i) =>
                i === answerState.questionIndex
                  ? {
                      ...q,
                      answers: q.answers.map((a, j) =>
                        j === answerState.answerIndex
                          ? {
                              ...a,
                              title: answerState.title,
                              isCorrect: answerState.isCorrect,
                            }
                          : a
                      ),
                    }
                  : q
              ),
            },
          };
        });
      },
      resetStore: () => {
        set(() => ({
          quizId: undefined,
          currentQuiz: { title: "", questions: [] },
        }));
      },
    }),
    {
      name: "quiz-storage",
    }
  )
);

export default quizStore;
