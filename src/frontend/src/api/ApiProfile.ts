import axios, { Axios, AxiosHeaders } from "axios";
import ProfileResponse from "../models/response/ProfileResponse";
import ProfileFailResponse from "../models/response/ProfileFailResponse";

namespace ApiProfile {
  /**
   * Fetches profile data based on the current user. The data is based
   * on what is to be displayed publicly.
   *
   * @param username The username of the user
   */
  export async function getProfileData(username: String) {
    try {
      const headers = new AxiosHeaders();
      return await axios
        .get<ProfileResponse>(`/api/users/profile/${username}`, {
          headers,
        })
        .then(({ data }) => {
          // Making sure that the request was successful
          if (!data.success) {
            const errorObj: ProfileFailResponse = {
              success: false,
              msg: "Failed to fetch profile data.",
            };
            return errorObj;
          }
          return data;
        });
    } catch (error) {
      console.error(error);
    }
  }
}

export { ApiProfile };
