import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "../../api/workshop";
import ProgressIndicator from "./ProgressIndicator";
import QuestionDisplay from "./QuestionDisplay";

const QuizContainer = () => {
  const quizId: string | undefined = useParams().id; // URL parameter recognition

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

  return (
    <div className="grid h-screen">
      <div id="quiz-header" className="text-center">
        <h2>{data.data.name}</h2>
      </div>
      <div id="content">
        <ProgressIndicator questionAmount={data.data.questions.length} />
        <QuestionDisplay questionData={data.data.questions[0]} />
      </div>
      <div id="quiz-footer" className="text-center">
        LangMaster
      </div>
    </div>
  );
};

export default QuizContainer;
