import Language from "../Language";
import Question from "../quiz/Question";

export default interface QuizResponse {
  id:           number;
  name:         string;
  description:  string;
  language:     Language;
  questions:    Question[]
}
