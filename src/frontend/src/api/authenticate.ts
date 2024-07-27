import axios from "axios";
import User from "../models/User";
import LoginResponse from "../models/response/LoginResponse";
/**
 * Sends a POST request to /api/users/register
 * Attempts to register a user.
 *
 * @param userCredentials JSON object with the credentials
 */
function registerUser(userCredentials: { username: string; password: string }) {
  return axios.post<User>("/api/users/register", userCredentials, {
    headers: {
      "content-type": "application/json",
    },
  });
}

/**
 * Sends a POST request to /api/users/login Attempts to log
 * the user in.
 *
 * @param userCredentials JSON object with the credentials
 */
function loginUser(userCredentials: { username: string; password: string }) {
  return axios
    .post<LoginResponse>("/api/users/login", userCredentials, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then(({ data }) => {
      // Setting the token.
      if (data.token !== undefined) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_username", userCredentials.username);
      }
    });
}

export { registerUser, loginUser };
