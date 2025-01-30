import Question from "../../types/quiz/Question";

const QuestionDisplay = ({ questionData }: { questionData: Question }) => {
  return (
    <div className="grid">
      <h4 className="text-center">{questionData.title}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {questionData.answers.map((answer) => (
          <div className="text-center my-3">{answer.title}</div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
