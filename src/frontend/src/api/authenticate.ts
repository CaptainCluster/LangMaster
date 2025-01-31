import axios, { AxiosResponse } from "axios";
import UserCredentials from "../types/UserCredentials";
import LoginResponse from "../types/response/LoginResponse";
import FailResponse from "../types/response/FailResponse";
import OkResponse from "../types/response/OkResponse";
import removeStorageItems from "../utils/removeStorageItems";

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

export async function checkTokenExpiration(): Promise<
  AxiosResponse<OkResponse> | FailResponse
> {
  try {
    const token = localStorage.getItem("auth_token");
    if (token?.length === 0) {
      console.error("No token found!");
      return {
        msg: "No token found!",
      };
    }
    const response = await axios.post<OkResponse>("/api/authenticate/", token);
    return response;
  } catch (error) {
    removeStorageItems();
    return {
      msg: "Token either expired or some other error occurred.",
    };
  }
}
