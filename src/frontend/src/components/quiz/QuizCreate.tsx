import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import QuizUpdate from "./QuizUpdate";

const QuizCreate = ({ setCreateComponent }: any) => {
  const [quizName, setQuizName] = useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: api.workshop.postQuiz,
    onSuccess: () => {
      setCreateComponent(<QuizUpdate />);
    },
    onError: (error) => {
      console.log(error);
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
      <input type="submit" value={"Create Quiz"}></input>
    </form>
  );
};

export default QuizCreate;
