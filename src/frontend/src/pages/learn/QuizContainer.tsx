import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../api/workshop";
import ProgressIndicator from "./ProgressIndicator";
import QuestionDisplay from "./QuestionDisplay";
import { useEffect, useState } from "react";
import { getQuizInstanceCoreData, inspectLives, postQuizInstanceCreation } from "../../api/learn";
import QuizInstanceResponse from "../../types/response/QuizInstanceResponse";
import Lives from "./Lives";
import { quizInstanceStore } from "../../stores/quizInstanceStore";
import FailureScreen from "./FailureScreen";

const QuizContainer = () => {
  const quizId: string | undefined = useParams().id; // URL parameter recognition
  const username: string | null = localStorage.getItem("auth_username");

  const [ quizInstanceData, setQuizInstanceData ] = useState<QuizInstanceResponse>();
  const [ enoughLives, setEnoughLives ] = useState<boolean>(false);
  const { lives, updateLives } = quizInstanceStore();

  // Fetching the data from the quizInstance
  useEffect(() => {
    const fetchData = async () => {
      const creationData = await postQuizInstanceCreation({ quizId: Number(quizId), username: `${username}`});

      if (!creationData) {
        return;
      }

      const enoughLivesResponse = await inspectLives(Number(creationData));
      
      if (!(typeof enoughLivesResponse == "boolean")) {
        return;
      }
      setEnoughLives(enoughLivesResponse);

      const quizInstanceCoreData = await getQuizInstanceCoreData(Number(creationData));

      if ("msg" in quizInstanceCoreData) {
        return;
      }
      setQuizInstanceData(quizInstanceCoreData);
      updateLives(quizInstanceCoreData.lives);
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

  if (!quizInstanceData) {
    return <span>Loading</span>
  }

  let name = "";

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
  }

  return (
    <>
      {
        lives > 0
          ?
          <div className="grid">
            <div id="quiz-header" className="mt-4 border-b border-gray-400 text-center">
              <h2 className="animate-flash">{name.toUpperCase()}</h2>
            </div>

            <div id="content">
              <ProgressIndicator questionAmount={Number(quizInstanceData?.totalQuestions)} />
              <Lives lives={lives}/>
              <QuestionDisplay quizInstanceId={Number(quizInstanceData?.id)} />
            </div>
          </div>

          :  <FailureScreen /> 
      }
    </>
  );
};

export default QuizContainer;
