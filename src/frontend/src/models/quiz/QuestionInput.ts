import Answer from "./Answer";

export default interface QuestionInput {
  quizId: number;
  title: string;
  answers: Answer[];
}
