import axios from "axios";
import User from "../models/User";
import LoginResponse from "../models/response/LoginResponse";

namespace ApiAuthenticate {
  /**
   * Sends a POST request to /api/users/register
   * Attempts to register a user.
   *
   * @param userCredentials JSON object with the credentials
   */
  export async function registerUser(userCredentials: {
    username: string;
    password: string;
  }) {
    return await axios.post<User>("/api/users/register", userCredentials, {
      headers: {},
    });
  }

  /**
   * Sends a POST request to /api/users/login Attempts to log
   * the user in.
   *
   * @param userCredentials JSON object with the credentials
   */
  export async function loginUser(userCredentials: {
    username: string;
    password: string;
  }) {
    return await axios
      .post<LoginResponse>("/api/users/login", userCredentials, {
        headers: {},
      })
      .then(({ data }) => {
        // Token and client username are stored in localstorage
        if (data.token !== undefined) {
          localStorage.setItem("auth_token", data.token);
          localStorage.setItem("auth_username", userCredentials.username);
        }
      });
  }
}

export { ApiAuthenticate };
