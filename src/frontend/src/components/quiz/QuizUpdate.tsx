import { useState } from "react";
import QuestionForm from "./QuestionForm";
import React from "react";
import { useMutation } from "@tanstack/react-query";

const QuizUpdate = () => {
  const [activeQuestionForms, setActiveQuestionForms] = useState(<></>);
  let formCount = 0;

  /**
   * Creating a new QuizQuestionForm component
   */
  const createQuestion = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActiveQuestionForms(
      <React.Fragment key={formCount++}>
        {activeQuestionForms}
        <QuestionForm />
      </React.Fragment>
    );
  };

  const submitUpdates = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <>
      <p>Update Quiz</p>
      <button onClick={createQuestion}>Create a Question</button>
      <div>{activeQuestionForms}</div>
      <div>
        <button onClick={submitUpdates}>Submit Updates</button>
      </div>
    </>
  );
};

export default QuizUpdate;
