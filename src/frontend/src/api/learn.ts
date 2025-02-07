import axios from "axios";
import InstanceInput from "../types/request/InstanceInput";
import FailResponse from "../types/response/FailResponse";

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
      msg: "Failed to fetch profile data.",
    };
  }
}
