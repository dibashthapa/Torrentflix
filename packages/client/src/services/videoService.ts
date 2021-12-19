import { Api } from "./apiService";

export interface VideoListResponse {
  filename: string;
  status: string;
  progress: string;
  hash: number;
  tags: string[];
  thumbnail: string;
}

const api = new Api(true);

export const getAllVideos = () => {
  const endpoint = "/video/all";
  const response = api.get<VideoListResponse[]>(endpoint);
  return response;
};
