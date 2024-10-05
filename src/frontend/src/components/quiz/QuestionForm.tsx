import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import quizStore from "../../stores/quizStore";
import QuestionState from "../../models/state/QuestionState";

interface QuestionFormProps {
  questionIndex: number;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ questionIndex }) => {
 
  const [activeAnswerForms, setActiveAnswerForms] = useState<JSX.Element[]>([]);  // An array of active form elements 
  const [formCount, setFormCount] = useState(0);                                  // The quantity of forms 
  const [questionTitle, setQuestionTitle] = useState("");                         // The title of the current question 
  const { processQuestionForQuiz } = quizStore();                                 // A function from a Zustand storage

  /// Triggering a call for processQuestionForQuiz() everytime the question experiences
  /// a change.
  useEffect(() => {
    const questionState: QuestionState = {
      index: questionIndex,
      title: questionTitle,
    };

    processQuestionForQuiz(questionState);
  }, [questionTitle, questionIndex, processQuestionForQuiz]);

  /// Upon trigger, creates a form for an answer to the question.
  const createAnswerForm = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveAnswerForms((prevForms) => [
      ...prevForms,
      <div key={formCount} id={`answer-form-${formCount}`}>
        <AnswerForm questionIndex={questionIndex} answerIndex={formCount} />
      </div>,
    ]);
    setFormCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <form className="answer-form-element">
        <input
          type="text"
          placeholder="Question Title"
          onChange={(event) => setQuestionTitle(event.target.value)}
        />
      </form>
      <button onClick={createAnswerForm}>Create Answer</button>
      {activeAnswerForms}
    </>
  );
};

export default QuestionForm;
