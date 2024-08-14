import axios, { AxiosResponse } from "axios";
import ProfileResponse from "../models/response/ProfileResponse";
import FailResponse from "../models/response/FailResponse";

/**
 * Fetches profile data based on the current user. The data is based
 * on what is to be displayed publicly.
 *
 * @param username The username of the user
 */
export async function getProfileData(
  username: string
): Promise<AxiosResponse<ProfileResponse> | FailResponse> {
  try {
    const response = await axios.get<ProfileResponse>(
      `/api/users/profile/${username}`
    );
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to fetch profile data.",
    };
  }
}
