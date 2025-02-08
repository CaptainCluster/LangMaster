import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/";
import { quizInstanceStore } from "../../stores/quizInstanceStore";

const AnswerButton = ({ answer, quizInstanceId }: { answer: any, quizInstanceId: number }) => {
  const { updateLives } = quizInstanceStore();
  const { mutate } = useMutation({
    mutationFn: api.learn.submitAnswer,
    onSuccess: (data) => {
      if ("lives" in data) {
        updateLives(data.lives); 
      }
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
