/**
 * @Component QuizCreate
 *
 * A form where the client creates a new Quiz
 *
 */

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api";
import QuizUpdate from "./QuizUpdate";
import quizStore from "../../stores/quizStore";

const QuizCreateForm = ({ setCreateComponent }: any) => {
  const [quizName, setQuizName] = useState("");
  const { setQuizId } = quizStore();

  const { mutate } = useMutation({
    mutationFn: api.workshop.postQuiz,

    // Quiz object for state management, rendering component for customizing
    // the newly created quiz
    onSuccess: async () => {
      try {
        const quizIdResponse = await api.workshop.getQuizById(quizName);

        // Making sure the data is valid
        if (typeof quizIdResponse === "object" && "data" in quizIdResponse) {
          setQuizId(quizIdResponse.data.id);
        } else if ("msg" in quizIdResponse) {
          console.error("Failed to get quiz ID:", quizIdResponse.msg);
        } else {
          console.error("Unexpected response:", quizIdResponse);
        }
      } catch (error) {
        console.error("Failed to get quiz ID:", error);
      }
      setCreateComponent(<QuizUpdate />);
    },
  });

  /**
   * Upon sub
   */
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
