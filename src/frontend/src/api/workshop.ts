import axios, { AxiosResponse } from "axios";
import OkResponse from "../models/response/OkResponse";
import FailResponse from "../models/response/FailResponse";
import QuestionInput from "../models/quiz/QuestionInput";

export async function postQuiz(
  quizName: string
): Promise<AxiosResponse<OkResponse> | FailResponse> {
  try {
    const response = await axios.post<OkResponse>("/api/quiz/", quizName, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to create the quiz.",
    };
  }
}

export async function getQuizById(
  quizName: string
): Promise<AxiosResponse<{ id: number }> | FailResponse> {
  try {
    const response = await axios.get<{ id: number }>(
      `/api/quiz/id/${quizName}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to create the quiz.",
    };
  }
}

export async function postQuestion(
  questionInput: QuestionInput
): Promise<AxiosResponse<OkResponse> | FailResponse> {
  try {
    const response = await axios.post<OkResponse>(
      "/api/question",
      questionInput,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to create the quiz.",
    };
  }
}
