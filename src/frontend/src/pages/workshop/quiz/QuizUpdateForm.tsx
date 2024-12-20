import QuestionForm from "./QuestionForm";
import Notification from "../../../components/Notification";
import { useMutation } from "@tanstack/react-query";
import quizStore from "../../../stores/quizStore";
import { api } from "../../../api";
import formStore from "../../../stores/quizFormStore";
import { useState } from "react";

const NOTIFY_UPDATE_SUCCESS = "The quiz has been updated successfully.";
const NOTIFY_UPDATE_FAILURE = "The quiz failed to get updated.";

const QuizUpdateForm = () => {
  const { currentQuiz } = quizStore();
  const { questionForms, addQuestionForm } = formStore();
  const [displayedNotification, setDisplayedNotification] = useState(<></>);

  const { mutate } = useMutation({
    mutationFn: api.workshop.putQuiz,
    onSuccess: async () => {
      console.log(currentQuiz);
      setDisplayedNotification(<Notification messageText={NOTIFY_UPDATE_SUCCESS}/>);
    },
    onError: (error) => {
      console.error(error);
      setDisplayedNotification(<Notification messageText={NOTIFY_UPDATE_FAILURE}/>)
    },
  });

  /**
   * Creating a new QuizQuestionForm component
   */
  const createQuestion = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addQuestionForm();
  };

  /**
   * Grabs the Quiz data from a Zustand storage and wraps it up so that
   * it is ready to be sent over to the server in a POST request,
   * effectively updating a quiz with all the implemented changes.
   */
  const submitUpdates = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!currentQuiz || !currentQuiz.questions) {
      console.error("Invalid quiz data");
      return;
    }
    mutate(currentQuiz);
  };

  return (
    <>
      <p>Update Quiz</p>
      <button onClick={createQuestion}>Create a Question</button>
      <div>
        {questionForms.map((form) => (
          <div key={form.id} id={`question-form-${form.id}`}>
            <QuestionForm questionIndex={form.id} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={submitUpdates}>Submit Updates</button>
      </div>
      <>
        {displayedNotification}
      </>
    </>
  );
};

export default QuizUpdateForm;
