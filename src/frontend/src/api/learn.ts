import axios from "axios";
import InstanceInput from "../types/request/InstanceInput";
import FailResponse from "../types/response/FailResponse";
import QuizInstanceResponse from "../types/response/QuizInstanceResponse";

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
