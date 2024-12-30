import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../../api";
import quizStore from "../../../stores/quizStore";

const QuizCreateForm = () => {
  const [quizName, setQuizName]     = useState("");
  const { setQuizTitle, setQuizId } = quizStore();

  const { mutate } = useMutation({
    mutationFn: api.workshop.postQuiz,

    /**
     * Upon a successful POST request to postQuiz, QuizCustomizeForm
     * component is rendered to allow the customization of the newly
     * created quiz.
     */
    onSuccess: async () => {
      try {
        const quizIdResponse = await api.workshop.getQuizId(quizName);

        /*
         * Scenarios
         * 
         * 1) Success      - Name and ID given to state management. Redirecting user 
         *                   to the edit page.
         * 2) Response msg - Printing the message. Assuming the quiz ID was not 
         *                   received.
         * 3) The rest     - In other scenarios, an unexpected response is printed.
         */
        if (typeof quizIdResponse === "object" && "data" in quizIdResponse) {
          setQuizTitle(quizName);
          setQuizId(quizIdResponse.data);
          window.location.href = `/workshop/edit/${quizIdResponse.data}`
        } else if ("msg" in quizIdResponse) {
          console.error("Failed to get quiz ID:", quizIdResponse.msg);
        } else {
          console.error("Unexpected response:", quizIdResponse);
        }
      } catch (error) {
        console.error("Failed to get quiz ID:", error);
      }
    },
  });

  const submitCreation = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    mutate(quizName);
  };

  return (
    <form onSubmit={submitCreation}>
      <input
        id="input-quiz-name"
        className="ml-5 text-black"
        type="text"
        onChange={(event) => setQuizName(event.target.value)}
      ></input>
      <input className="px-3" type="submit" value="Create Quiz"></input>
    </form>
  );
};

export default QuizCreateForm;
