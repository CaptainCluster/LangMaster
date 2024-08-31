import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import QuizUpdate from "./QuizUpdate";
import useStore from "../../stores/store";

const QuizCreate = ({ setCreateComponent }: any) => {
  const [quizName, setQuizName] = useState("");
  const navigate = useNavigate();

  const { updateQuiz } = useStore();

  const { mutate } = useMutation({
    mutationFn: api.workshop.postQuiz,

    // Quiz object for state management, rendering component for customizing
    // the newly created quiz
    onSuccess: () => {
      updateQuiz({ title: quizName, questions: [] });
      setCreateComponent(<QuizUpdate />);
    },
    onError: (error) => {
      console.error(error);
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
