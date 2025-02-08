import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/";

const AnswerButton = ({ answer, quizInstanceId }: { answer: any, quizInstanceId: number }) => {

  console.log(answer)
  const { mutate } = useMutation({
    mutationFn: api.learn.submitAnswer,
    onSuccess: (data) => {
      console.log(data);
    }
  });

  const submitAnswer = () => {
    mutate({
      quizInstanceId: quizInstanceId,
      answerId: answer.id
    });
  };

  return (
    <div className="text-center my-5 mx-2 px-2 py-4 border border-white rounded-lg transform transition-transform hover:scale-105 hover:cursor-pointer"
      onClick={submitAnswer}
    >
      <span>{answer.title}</span>
    </div>

  );
} 

export default AnswerButton;
