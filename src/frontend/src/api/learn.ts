import axios from "axios";
import InstanceInput from "../types/request/InstanceInput";
import FailResponse from "../types/response/FailResponse";
import QuizInstanceResponse from "../types/response/QuizInstanceResponse";
import Question from "../types/quiz/Question";

export async function postQuizInstanceCreation(
  instanceInput: InstanceInput
): Promise<{ quizInstanceId: number } | FailResponse> {
  try {
    const response = await axios.post<{ quizInstanceId: number }>(
      `/api/instance/create`,
      instanceInput
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to handle quiz instance creation.",
    };
  }
}

export async function getQuizInstanceCoreData(
  quizInstanceId: number
): Promise<QuizInstanceResponse | FailResponse> {
  try {
    const response = await axios.get<QuizInstanceResponse>(
      `/api/instance/core/${quizInstanceId}`
    );
    return response.data;
  } catch(error) {
    console.error(error);
    return {
      msg: "Failed to fetch core data for the instance.",
    };
  }
}

export async function getRandomQuestion(
  quizInstanceId: number
): Promise<Question| FailResponse> {
  try {
    const response = await axios.get<Question>(
      `/api/instance/random/${quizInstanceId}`
    );
    return response.data;
  } catch(error) {
    console.error(error);
    return {
      msg: "Failed to fetch core data for the instance.",
    };
  }
}
