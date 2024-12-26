import Language from "../Language";
import Question from "../quiz/Question";

export default interface QuizResponse {
  name:         String;
  description:  String;
  language:     Language;
  questions:    Question[]
}
