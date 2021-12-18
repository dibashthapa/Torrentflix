import { Api } from "./apiService";

export interface VideoListResponse {
  title: string;
  duration: string;
  status: string;
  progress: string;
  hash: number;
}

const api = new Api(true);

export const getAllVideos = () => {
  const endpoint = "/videos/all";
  const response = api.get<VideoListResponse>(endpoint);
  return response;
};
