import axios, { AxiosResponse } from "axios";
import UserCredentials from "../models/UserCredentials";
import LoginResponse from "../models/response/LoginResponse";
import FailResponse from "../models/response/FailResponse";
import OkResponse from "../models/response/OkResponse";

/**
 * a POST request
 * @route /api/users/register
 * @brief Attempts to register a user.
 * @param userCredentials Username and Password
 */
export async function registerUser(
  userCredentials: UserCredentials
): Promise<AxiosResponse<OkResponse> | FailResponse> {
  try {
    const response = await axios.post<OkResponse>(
      "/api/users/register",
      userCredentials
    );
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to register user.",
    };
  }
}

/**
 * a POST request
 * @route /api/users/login
 * @brief Attempts to log the user in.
 * @param userCredentials Username and Password
 */
export async function loginUser(
  userCredentials: UserCredentials
): Promise<AxiosResponse<LoginResponse> | FailResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      "/api/users/login",
      userCredentials
    );
    if (response.data.token !== undefined) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("auth_username", userCredentials.username);
    }
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to log in.",
    };
  }
}
