/**
 * @Component QuizCreate
 */

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api";
import QuizUpdateForm from "./QuizUpdateForm";
import quizStore from "../../stores/quizStore";

const QuizCreateForm = ({ setCreateComponent }: any) => {
  const [quizName, setQuizName] = useState("");
  const { setQuizId } = quizStore();

  const { mutate } = useMutation({
    mutationFn: api.workshop.postQuiz,

    /**
     * Upon a successful POST request to postQuiz, QuizCustomizeForm
     * component is rendered to allow the customization of the newly
     * created quiz.
     */
    onSuccess: async () => {
      try {
        const quizIdResponse = await api.workshop.getQuizById(quizName);

        /**
         * If the response contains the id, it will be put in the state management
         * storage. Otherwise an error message is shown.
         */
        if (typeof quizIdResponse === "object" && "data" in quizIdResponse) {
          setQuizId(quizIdResponse.data.id);
          setCreateComponent(<QuizUpdateForm />);
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
        type="text"
        onChange={(event) => setQuizName(event.target.value)}
      ></input>
      <input type="submit" value="Create Quiz"></input>
    </form>
  );
};

export default QuizCreateForm;
