/**
 * A component representing a form for creating a quiz
 */

import { useMemo, useState } from "react";
import AnswerForm from "./AnswerForm";
import quizStore from "../../stores/quizStore";
import QuestionState from "../../models/state/QuestionState";

const QuestionForm = ({ questionIndex }: any) => {
  const [activeAnswerForms, setActiveAnswerForms] = useState(<></>);
  const [formCount, setFormCount] = useState(0);
  const [questionTitle, setQuestionTitle] = useState("");
  const { updateExistingQuestion } = quizStore();

  /**
   * useMemo for interacting with the quizStore Zustand storage.
   * Stores the updated question into the database.
   */
  useMemo(() => {
    const questionState: QuestionState = {
      index: questionIndex,
      title: questionTitle,
    };

    updateExistingQuestion(questionState);
  }, [questionTitle]);

  const createAnswerForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActiveAnswerForms(
      <div id={`answer-form-${formCount}`}>
        {activeAnswerForms}
        <AnswerForm questionIndex={questionIndex} answerIndex={formCount} />
      </div>
    );
    setFormCount(formCount + 1);
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
