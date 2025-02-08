import { getRandomQuestion } from "../../api/learn";
import { useQuery } from "@tanstack/react-query";
import AnswerButton from "./AnswerButton";

const QuestionDisplay = ({ quizInstanceId }: { quizInstanceId: number }) => {
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getRandomQuestion(quizInstanceId),
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

  if (!("title" in data) || !("answers" in data)) {
    return <span>Error! Inadequate data in fetched question.</span>
  }

  // Returning either a component with the question and answers or span notifying of lacking options for an asnwer
  return (
    <div className="mt-20 grid">
      {
        data.title.length > 0 
        ? <h4 className="text-center">{data.title}</h4>
        : <h4 className="text-center">No question title found!</h4>
      }
      <div>
        <p className="italic font-[18px]">Select your answer!</p>
      </div>
      {data.answers.length > 0 
        ? 
        <div className="grid grid-cols-2 md:grid-cols-3">
          {
            data.answers.map((answer) => (
              <AnswerButton answer={answer} quizInstanceId={quizInstanceId}/>
            ))
          }
        </div>
        : 
        <div className="text-center">
          <span>No answers found for this question.</span>
        </div>
      }
    </div>
  );
};

export default QuestionDisplay;
