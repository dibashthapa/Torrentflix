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

export const getSingleVideo = (hash: string) => {
  const endpoint = "/video/" + hash;
  const response = api.get<VideoListResponse>(endpoint)
  return response
};

export const createVideo = (link: string) => {
  const endpoint = "/video/create";
  const response = api.post<VideoListResponse>(endpoint, { link });
  return response;
};
