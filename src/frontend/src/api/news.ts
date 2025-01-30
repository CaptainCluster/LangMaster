import axios, { AxiosResponse } from "axios";
import NewsResponse from "../types/response/NewsResponse";
import FailResponse from "../types/response/FailResponse";

export async function getLatestNews(): Promise<
  AxiosResponse<NewsResponse> | FailResponse
> {
  try {
    const response = await axios.get<NewsResponse>("/api/news/latest");
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to fetch profile data.",
    };
  }
}
