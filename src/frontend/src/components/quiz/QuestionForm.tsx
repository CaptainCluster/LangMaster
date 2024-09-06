import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import quizStore from "../../stores/quizStore";
import QuestionState from "../../models/state/QuestionState";

interface QuestionFormProps {
  questionIndex: number;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ questionIndex }) => {
  const [activeAnswerForms, setActiveAnswerForms] = useState<JSX.Element[]>([]);
  const [formCount, setFormCount] = useState(0);
  const [questionTitle, setQuestionTitle] = useState("");
  const { updateExistingQuestion } = quizStore();

  useEffect(() => {
    const questionState: QuestionState = {
      index: questionIndex,
      title: questionTitle,
    };

    updateExistingQuestion(questionState);
  }, [questionTitle, questionIndex, updateExistingQuestion]);

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
