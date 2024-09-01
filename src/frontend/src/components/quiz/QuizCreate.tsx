import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import QuizUpdate from "./QuizUpdate";
import useStore from "../../stores/store";
import quizStore from "../../stores/quizStore";
import { AxiosResponse } from "axios";
import FailResponse from "../../models/response/FailResponse";

const QuizCreate = ({ setCreateComponent }: any) => {
  const [quizName, setQuizName] = useState("");
  const navigate = useNavigate();
  const { updateQuiz } = useStore();
  const { updateQuizName, updateQuizId } = quizStore();

  const { mutate } = useMutation({
    mutationFn: api.workshop.postQuiz,

    // Quiz object for state management, rendering component for customizing
    // the newly created quiz
    onSuccess: async () => {
      updateQuiz({ title: quizName, questions: [] });
      updateQuizName(quizName);
      try {
        const quizIdResponse = await api.workshop.getQuizById(quizName);
        if (typeof quizIdResponse === "object" && "data" in quizIdResponse) {
          const quizId = quizIdResponse.data;
          updateQuizId(quizId.id);
          console.log("Quiz ID:", quizId);
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

export default QuizCreate;
