import axios, { AxiosResponse } from "axios";
import OkResponse from "../types/response/OkResponse";
import FailResponse from "../types/response/FailResponse";
import QuizResponse from "../types/response/QuizResponse";
import Question from "../types/quiz/Question";
import QuizInput from "../types/request/QuizInput";

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
  quiz: QuizInput
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

export async function getQuizById(
  quizId: number
): Promise<AxiosResponse<QuizResponse> | FailResponse> {
  try {
    const response = await axios.get<QuizResponse>(`/api/quiz/getid/${quizId}`);
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to fetch the quiz.",
    };
  }
}

export async function getQuizNameById(
  quizId: number
): Promise<AxiosResponse<string> | FailResponse> {
  try {
    const response = await axios.get<string>(`/api/quiz/name/${quizId}`);
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to fetch the quiz.",
    };
  }
}

export async function getAllQuizzes(): Promise<
  AxiosResponse<QuizResponse[]> | FailResponse
> {
  try {
    const response = await axios.get<QuizResponse[]>("/api/quiz/all");
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to fetch the quizzes.",
    };
  }
}

export async function deleteQuiz(
  quizId: number
): Promise<AxiosResponse<OkResponse> | FailResponse> {
  try {
    const response = await axios.delete<OkResponse>(`/api/quiz/${quizId}`);
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
