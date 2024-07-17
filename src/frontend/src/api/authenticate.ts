import User from "../models/User";
import LoginResponse from "../models/response/LoginResponse";
import axios from "axios";

/**
 * Sends a POST request to /api/users/register
 * Attempts to register a user. 
 * 
 * @param userCredentials JSON object with the credentials
 */
function registerUser(userCredentials: User) {
    axios.post(
        "/api/users/register", 
        userCredentials, 
        {
            headers: {
                "content-type": "application/json"
            }
        }
    );
}

/**
 * Sends a POST request to /api/users/login Attempts to log 
 * the user in. 
 * 
 * @param userCredentials JSON object with the credentials
 */
function loginUser(userCredentials: User) {
    return axios
        .post<LoginResponse>(
            "/api/users/login",
            userCredentials,
            {
                headers: {
                    "content-type": "application/json"
                }
            }
        )
        .then(({data}) => {
            localStorage.setItem("auth_token", data.token);
        });
}

export { registerUser, loginUser }