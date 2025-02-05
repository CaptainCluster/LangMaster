import axios from "axios";
import ProfileResponse from "../types/response/ProfileResponse";
import FailResponse from "../types/response/FailResponse";

/**
 * Fetches profile data based on the current user. The data is based
 * on what is to be displayed publicly.
 *
 * @param username The username of the user
 */
export async function getProfileData(
  username: string
): Promise<ProfileResponse | FailResponse> {
  try {
    const response = await axios.get<ProfileResponse>(
      `/api/users/profile/${username}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to fetch profile data.",
    };
  }
}
