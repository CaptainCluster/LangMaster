import { useState } from "react";
import QuestionForm from "./QuestionForm";
import { useMutation } from "@tanstack/react-query";
import quizStore from "../../stores/quizStore";
import { api } from "../../api";

interface Form {
  id: number;
}

const QuizUpdate = () => {
  const [questionForms, setQuestionForms] = useState<Form[]>([]);
  const [formCount, setFormCount] = useState<number>(0);
  const { currentQuiz } = quizStore();

  const { mutate } = useMutation({
    mutationFn: api.workshop.putQuiz,

    onSuccess: async () => {
      console.log(currentQuiz);
      console.log("wee");
    },
  });
  /**
   * Creating a new QuizQuestionForm component
   */
  const createQuestion = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setQuestionForms((prevForms) => [...prevForms, { id: formCount }]);
    setFormCount((prevCount) => prevCount + 1);
  };

  /**
   * Grabs the Quiz data from a Zustand storage and wraps it up so that
   * it is ready to be sent over to the server in a POST request,
   * effectively updating a quiz with all the implemented changes.
   */
  const submitUpdates = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate(currentQuiz);
  };

  return (
    <>
      <p>Update Quiz</p>
      <button onClick={createQuestion}>Create a Question</button>
      <div>
        {questionForms.map((form) => (
          <div key={form.id} id={`question-form-${form.id}`}>
            <QuestionForm index={form.id} />
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
