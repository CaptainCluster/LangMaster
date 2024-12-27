import Language from "../Language";
import Question from "../quiz/Question";

export default interface QuizResponse {
  id:           number;
  name:         String;
  description:  String;
  language:     Language;
  questions:    Question[]
}
