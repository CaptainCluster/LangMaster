import axios, { AxiosResponse } from "axios";
import NewsResponse from "../models/response/NewsResponse";
import FailResponse from "../models/response/FailResponse";

export async function getLatestNews(): Promise<AxiosResponse<NewsResponse> | FailResponse> {
  try {
    const response = await axios.get<NewsResponse>(
      "/api/news/latest"
    );
    return response;
  } catch (error) {
    console.error(error);
    return {
      msg: "Failed to fetch profile data.",
    };
  }
}
