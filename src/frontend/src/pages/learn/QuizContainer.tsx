import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../api/workshop";
import ProgressIndicator from "./ProgressIndicator";
import QuestionDisplay from "./QuestionDisplay";
import Question from "../../types/quiz/Question";
import { useEffect, useState } from "react";
import { getQuizInstanceCoreData, postQuizInstanceCreation } from "../../api/learn";
import QuizInstanceResponse from "../../types/response/QuizInstanceResponse";
import Lives from "./Lives";

const QuizContainer = () => {
  const quizId: string | undefined = useParams().id; // URL parameter recognition
  const username: string | null = localStorage.getItem("auth_username");

  const [ quizInstanceData, setQuizInstanceData ] = useState<QuizInstanceResponse>();

  // Fetching the data from the quizInstance
  useEffect(() => {
    const fetchData = async () => {
      const quizInstanceId = await postQuizInstanceCreation({ quizId: Number(quizId), username: `${username}`});

      if (!quizInstanceId) {
        return;
      }
      const quizInstanceCoreData = await getQuizInstanceCoreData(Number(quizInstanceId));
      console.log(quizInstanceCoreData)

      if ("msg" in quizInstanceCoreData) {
        return;
      }
      setQuizInstanceData(quizInstanceCoreData);
    }
    fetchData();
  }, []);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["news"],
    queryFn: () => getQuizById(Number(quizId)),
  });

  if (isLoading) {
    return <span className="text-white">Loading...</span>;
  }
  if (isError) {
    return <span className="text-white">Error: {error.message}</span>;
  }
  if (data === undefined) {
    return <span className="text-white">No data</span>;
  }

  let name = "";
  let questions: Question[] = [];

  if (quizInstanceData?.totalQuestions === 0) {
    return (
      <div className="flex justify-center">
        <h1 className="py-10">This quiz has no questions!</h1>  
      </div>
    );
  }

  // Letting the user know if no questions exit for the quiz.
  if ("data" in data) {

    if ("name" in data.data) {
      name = data.data.name
    }

    if ("questions" in data.data) {
      questions = data.data.questions;
    }
  }

  return (
    <div className="grid">
      <div id="quiz-header" className="mt-4 border-bottom border-white text-center">
        <h2 className="animate-flash">{name.toUpperCase()}</h2>
      </div>

      <div id="content">
        <ProgressIndicator questionAmount={Number(quizInstanceData?.totalQuestions)} />
        <Lives lives={Number(quizInstanceData?.lives)}/>
        <QuestionDisplay questionData={questions[0]} />
      </div>
    </div>
  );
};

export default QuizContainer;
