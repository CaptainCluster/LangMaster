import axios, { AxiosResponse } from "axios";
import OkResponse from "../models/response/OkResponse";
import FailResponse from "../models/response/FailResponse";
import Quiz from "../models/quiz/Quiz";
import Question from "../models/quiz/Question";

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

export async function putQuiz(
  quiz: Quiz
): Promise<AxiosResponse<OkResponse> | FailResponse> {
  try {
    const response = await axios.put<OkResponse>("/api/quiz/", quiz);
    return response;
  } catch (error) {
    return {
      msg: "Failed to edit the quiz.",
    };
  }
}

export async function getQuizId(
  quizName: string
): Promise<AxiosResponse<{ id: number }> | FailResponse> {
  try {
    const response = await axios.get<{ id: number }>(
      `/api/quiz/id/${quizName}`
    );
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to create the quiz.",
    };
  }
}

export async function postQuestion(
  question: Question
): Promise<AxiosResponse<OkResponse> | FailResponse> {
  try {
    const response = await axios.post<OkResponse>("/api/question", question, {
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
