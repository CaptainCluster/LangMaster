/**
 * This file manages global state for the customization of a quiz. This is
 * important because the data created while customizing the quiz has to be
 * able to be sent over to the server.
 *
 * The quiz, its questions and the answers of each question are stored here.
 * This allows them to be conveniently fetched and placed in a request when
 * the client wishes to save the changes.
 *
 * @dependencies
 * 1) Zustand for state management
 * 2) Zustand persist middleware for persistent state
 */

import { create } from "zustand";

import Question from "../models/quiz/Question";
import Quiz from "../models/quiz/Quiz";

import QuestionState from "../models/state/QuestionState";
import AnswerState from "../models/state/AnswerState";

interface QuizStoreState {
  quizId: number | undefined;
  currentQuiz: Quiz;

  setQuizTitle: (title: string) => void;
  setQuizId: (id: number) => void;
  updateQuiz: (quiz: Quiz) => void;
  processQuestionForQuiz: (questionState: QuestionState) => void;
  processAnswerForQuiz: (answerState: AnswerState) => void;
  resetStore: () => void;
}

const quizStore = create<QuizStoreState>()(
  (set) => ({
    quizId: undefined,
    currentQuiz: { title: "", questions: [] },

    setQuizTitle: (title: string) => {
      set((state) => ({
        ...state,
        currentQuiz: {
          ...state.currentQuiz,
          title: title,
        },
      }));
    },

    setQuizId: (id: number) => set({ quizId: id }),

    // Updating the state of the currently stored quiz
    updateQuiz: (quiz: Quiz) => {
      set((state: QuizStoreState) => ({
        ...state,
        currentQuiz: quiz,
      }));
    },

    /**
       * An update to an existing Question. Uses its index to pinpoint
       * which object to change and uses the title in the QuestionState
       * object to overwrite the former title.
       */
    processQuestionForQuiz: (questionState: QuestionState) => {
      set((state: QuizStoreState) => {
        // If the question does not exist, it is pushed into the questions array
        // of the Quiz object.
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

        // If the Question exists, an index is used to coordinate which object
        // in the questions array has its data overwritten.
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

    processAnswerForQuiz: (answerState: AnswerState) => {
      set((state: QuizStoreState) => {
        const question =
          state.currentQuiz.questions[answerState.questionIndex];
        if (!question) {
          return state;
        }
        const answer = question.answers[answerState.answerIndex];
        if (!answer) {
          question.answers[answerState.answerIndex] = {
            title: answerState.title,
            isCorrect: answerState.isCorrect,
          };
          return state;
        }

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
);

export default quizStore;
