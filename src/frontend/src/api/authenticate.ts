import axios from "axios";
import User from "../models/User";
import LoginResponse from "../models/response/LoginResponse";
import ProfileResponse from "../models/response/ProfileResponse";

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
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      // Token and client username are stored in localstorage
      if (data.token !== undefined) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_username", userCredentials.username);
      }
    });
}

/**
 * Fetches profile data based on the current user. The data is based
 * on what is to be displayed publicly.
 *
 * @param username The username of the user
 */
function getProfileData(username: String) {
  return axios
    .get<ProfileResponse>(`/api/users/profile/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      if (!data.success) {
        return;
      }
      return data;
    });
}

export { registerUser, loginUser, getProfileData };
