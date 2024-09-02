import { useState } from "react";
import QuestionForm from "./QuestionForm";

interface Form {
  id: number;
}

const QuizUpdate = () => {
  const [questionForms, setQuestionForms] = useState<Form[]>([]);
  const [formCount, setFormCount] = useState<number>(0);

  /**
   * Creating a new QuizQuestionForm component
   */
  const createQuestion = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setQuestionForms((prevForms) => [...prevForms, { id: formCount }]);
    setFormCount((prevCount) => prevCount + 1);
  };

  const submitUpdates = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // TO DO: implement submit logic here
  };

  return (
    <>
      <p>Update Quiz</p>
      <button onClick={createQuestion}>Create a Question</button>
      <div>
        {questionForms.map((form) => (
          <div key={form.id} id={`question-form-${form.id}`}>
            <QuestionForm />
          </div>
        ))}
      </div>
      <div>
        <button onClick={submitUpdates}>Submit Updates</button>
      </div>
    </>
  );
};

export default QuizUpdate;
