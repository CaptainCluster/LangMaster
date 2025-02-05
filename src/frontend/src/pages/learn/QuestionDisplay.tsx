import Question from "../../types/quiz/Question";

const QuestionDisplay = ({ questionData }: { questionData: Question }) => {
  return (
    <div className="mt-20 grid">
      <h4 className="text-center">{questionData.title}</h4>

      <div>
        <p className="italic font-[18px]">Select your answer!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3">
        {questionData.answers.map((answer) => (
          <div className="text-center my-5 mx-2 px-2 py-4 border border-white rounded-lg transform transition-transform hover:scale-105 hover:cursor-pointer"
            onClick={() => console.log("The answer should be sumitted to the server.")}
          >
            <span>{answer.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
