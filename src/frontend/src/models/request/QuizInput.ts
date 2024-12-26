import Question from "../quiz/Question";

export default interface QuizInput {
  id:         number;
  title:      String;
  questions:  Question[];
}
