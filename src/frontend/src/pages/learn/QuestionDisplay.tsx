import { getRandomQuestion } from "../../api/learn";
import { useQuery } from "@tanstack/react-query";

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
      <h4 className="text-center">{data.title}</h4>
      <div>
        <p className="italic font-[18px]">Select your answer!</p>
      </div>
      {data.answers.length > 0 
        ? 
        <div className="grid grid-cols-2 md:grid-cols-3">
          {data.answers.map((answer) => (
            <div className="text-center my-5 mx-2 px-2 py-4 border border-white rounded-lg transform transition-transform hover:scale-105 hover:cursor-pointer"
              onClick={() => console.log("The answer should be submitted to the server.")}
            >
              <span>{answer.title}</span>
            </div>
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
