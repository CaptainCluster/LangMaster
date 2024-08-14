/**
 * A component representing a form for creating a quiz
 */

import { useState } from "react";
import AnswerForm from "./AnswerForm";
import React from "react";

const QuestionForm = () => {
  const [activeAnswerForms, setActiveAnswerForms] = useState(<></>);
  let formCount = 0;

  const createAnswerForm = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActiveAnswerForms(
      <React.Fragment key={formCount}>
        {activeAnswerForms}
        <AnswerForm />
      </React.Fragment>
    );
    formCount++;
  };

  return (
    <>
      <form>
        <input type="text" placeholder="Question Title" />
        <input type="submit" value="Create question" />
        {activeAnswerForms}
      </form>
      <button onClick={createAnswerForm}>Create Answer</button>
    </>
  );
};

export default QuestionForm;
