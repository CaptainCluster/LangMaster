import axios, { AxiosResponse } from "axios";
import OkResponse from "../models/response/OkResponse";
import FailResponse from "../models/response/FailResponse";

export async function postQuiz(
  quizName: string
): Promise<AxiosResponse<OkResponse> | FailResponse> {
  try {
    const response = await axios.post<OkResponse>("/api/quiz/", quizName, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to create the quiz.",
    };
  }
}
