import QuestionForm from "./QuestionForm";
import { useMutation} from "@tanstack/react-query";
import quizStore from "../../../stores/quizStore";
import { api } from "../../../api";
import formStore from "../../../stores/quizFormStore";
import QuizInput from "../../../types/request/QuizInput";
import { useNotificationStore } from "../../../stores/notificationStore";

const NOTIFY_UPDATE_SUCCESS = "The quiz has been updated successfully.";
const NOTIFY_UPDATE_FAILURE = "The quiz failed to get updated.";

const QuizUpdateForm = () => {
  const { quizId, currentQuiz } = quizStore();
  const { questionForms, addQuestionForm } = formStore();
  const {triggerNotification} = useNotificationStore();

  const { mutate } = useMutation({
    mutationFn: api.workshop.putQuiz,
    onSuccess: async () => {
      triggerNotification(NOTIFY_UPDATE_SUCCESS, "success");
    },
    onError: () => {
      triggerNotification(NOTIFY_UPDATE_FAILURE, "error");
    },
  });

  /**
   * Creating a new QuizQuestionForm component
   */
  const createQuestion = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addQuestionForm();
  };

  /**
   * Grabs the Quiz data from a Zustand storage and wraps it up so that
   * it is ready to be sent over to the server in a POST request,
   * effectively updating a quiz with all the implemented changes.
   */
  const submitUpdates = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await api.workshop.getQuizNameById(Number(quizId));

    if (!response) {
      console.error("No name for the quiz was found!");
      return;
    }
    if (!("data" in response)) {
      console.error("No name for the quiz was found!");
      return;
    }

    const quizInput: QuizInput = {
      id: Number(quizId),
      name: response.data,
      questions: currentQuiz.questions,
    };

    if (!currentQuiz || !currentQuiz.questions) {
      console.error("Invalid quiz data");
      return;
    }
    mutate(quizInput);
  };

  return (
    <>
      <div className="flex justify-center">
        <button onClick={createQuestion}>Create a Question</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
        {questionForms.map((form) => (
          <div
            className="bg-white rounded-lg p-2"
            key={form.id}
            id={`question-form-${form.id}`}
          >
            <QuestionForm questionIndex={form.id} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={submitUpdates}>Submit Updates</button>
      </div>
    </>
  );
};

export default QuizUpdateForm;
