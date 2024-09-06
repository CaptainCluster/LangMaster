import { create } from "zustand";

interface QuestionForm {
  id: number;
}

interface QuizFormStore {
  questionForms: QuestionForm[];
  formCount: number;
  addQuestionForm: () => void;
}

const quizFormStore = create<QuizFormStore>((set) => ({
  questionForms: [],
  formCount: 0,
  addQuestionForm: () =>
    set((state) => ({
      questionForms: [...state.questionForms, { id: state.formCount }],
      formCount: state.formCount + 1,
    })),
}));

export default quizFormStore;
