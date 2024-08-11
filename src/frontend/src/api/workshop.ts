import axios, { AxiosResponse } from "axios";
import OkResponse from "../models/response/OkResponse";
import FailResponse from "../models/response/FailResponse";
import PostWorkshopInput from "../models/request/PostWorkshopInput";

export async function postQuiz(
  quizName: PostWorkshopInput
): Promise<AxiosResponse<OkResponse> | FailResponse> {
  try {
    const response = await axios.post<OkResponse>("/api/quiz", quizName);
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to create the quiz.",
    };
  }
}
