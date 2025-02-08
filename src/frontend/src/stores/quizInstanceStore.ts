import { create } from "zustand";

export interface QuizInstanceStore{
  lives: number;
  
  updateLives: (newLives: number) => void;
}

export const quizInstanceStore = create<QuizInstanceStore>()((set) => ({
  lives: 0,

  updateLives: (newLives: number) =>
    set((state: QuizInstanceStore) => ({
      ...state,
      lives: newLives,
    })),

}));
