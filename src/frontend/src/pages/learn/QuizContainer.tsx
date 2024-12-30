import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "../../api/workshop";

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

  console.log(data.data)

  return (
    <div>
      <div>
        {data.data.name}
      </div>
      {quizId} 
    </div>
  );
}

export default QuizContainer;
