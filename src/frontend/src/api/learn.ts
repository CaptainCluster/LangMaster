import axios from "axios";
import InstanceInput from "../types/request/InstanceInput";
import FailResponse from "../types/response/FailResponse";
import QuizInstanceResponse from "../types/response/QuizInstanceResponse";
import Question from "../types/quiz/Question";
import InstanceAnswer from "../types/request/InstanceAnswer";

/**
 * POST request 
 * @route /api/instance/create
 */ 
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

/**
 * GET request
 * @route /api/instance/core/<quizInstanceId>
 */ 
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

/**
 * GET request
 * @route /api/instance/random/<quizInstanceId>
 */ 
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

/**
 * POST request
 * @route /api/instance/submission
 */ 
export async function submitAnswer(
  instanceAnswer: InstanceAnswer
): Promise<QuizInstanceResponse | FailResponse> {
  try {
    const response = await axios.post<QuizInstanceResponse>(
      "/api/instance/submission",
      instanceAnswer
    );
    return response.data;
  } catch(error) {
    console.error(error);
    return {
      msg: "Error when attempting to submit the answer.",
    };
  }
}

export async function inspectLives(
  quizInstanceId: number
): Promise<boolean | FailResponse> {
  try {
    const response = await axios.get<boolean>(`/api/instance/lives/${quizInstanceId}`);
    return response.data;
  } catch(error) {
    console.error(error);
    return {
      msg: "Error when attempting to receive lives."
    }
  }
} 
