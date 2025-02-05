import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../../api";
import quizStore from "../../../stores/quizStore";
import { useNavigate } from "react-router-dom";

const QuizCreateForm = () => {
  const [quizNameForm, setQuizNameForm]     = useState("");
  const { setQuizTitle, setQuizName, setQuizId } = quizStore();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: api.workshop.postQuiz,

    /**
     * Upon a successful POST request to postQuiz, QuizCustomizeForm
     * component is rendered to allow the customization of the newly
     * created quiz.
     */
    onSuccess: async () => {
      try {
        const quizIdResponse = await api.workshop.getQuizId(quizNameForm);

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
          setQuizTitle(quizNameForm);
          setQuizName(quizNameForm);
          setQuizId(quizIdResponse.data);
          navigate(`/workshop/edit/${quizIdResponse.data}`);
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
    mutate(quizNameForm);
  };

  return (
    <form onSubmit={submitCreation}>
      <input
        id="input-quiz-name"
        className="ml-5 text-black"
        type="text"
        onChange={(event) => setQuizNameForm(event.target.value)}
      ></input>
      <input className="px-3" type="submit" value="Create Quiz"></input>
    </form>
  );
};

export default QuizCreateForm;
