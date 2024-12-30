import Question from "../quiz/Question";

export default interface QuizInput {
  id:         number;
  name:      String;
  questions:  Question[];
}
