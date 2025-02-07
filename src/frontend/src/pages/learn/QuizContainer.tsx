import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProgressIndicator from "./ProgressIndicator";
import { postQuizInstanceCreation } from "../../api/learn";
import QuestionDisplay from "./QuestionDisplay";
import Question from "../../types/quiz/Question";

const QuizContainer = () => {
  const quizId: string | undefined = useParams().id; // URL parameter recognition

  /**
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: () => postQuizInstanceCreation,
  });

  if (isLoading) {
    return <span className="text-white">Loading...</span>;
  }
  if (isError) {
    return <span className="text-white">Error: {error.message}</span>;
  }
  if (data === undefined) {
    return <span className="text-white">No data</span>;
  }*/
  
  const { mutate } = useMutation({
    mutationFn: postQuizInstanceCreation,

    onSuccess: (data) => {
      console.log(data);
    }
  });

  mutate({
    quizId: Number(quizId),
    username: localStorage.getItem("auth_username") as string,
  });

  let name = "";
  let questions: Question[] = [];

  // Letting the user know if no questions exit for the quiz.
  //
  /**
  if ("data" in data) {
    if (data.data.questions.length === 0) {
      return (
        <div className="flex justify-center">
          <h1 className="py-10">This quiz has no questions!</h1>  
        </div>
      );
    }

    if ("name" in data.data) {
      name = data.data.name
    }

    if ("questions" in data.data) {
      questions = data.data.questions;
    }
  }
  */

  return (
    <div className="grid">
      <div id="quiz-header" className="mt-4 border-bottom border-white text-center">
        <h2 className="animate-flash">{name.toUpperCase()}</h2>
      </div>

      <div id="content">
        <ProgressIndicator questionAmount={questions.length} />
        <QuestionDisplay questionData={questions[0]} />
      </div>
    </div>
  );
};

export default QuizContainer;
