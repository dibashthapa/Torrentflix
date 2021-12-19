import { User } from "../auth/authContext";
import { Api } from "./apiService";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredential extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export const loginService = (credentials: LoginCredentials | undefined) => {
  const api = new Api();
  const endpoint = "/login/basic";
  const response = api.post<AuthResponse>(endpoint, credentials);
  return response;
};

export const registerService = (credentials: SignupCredential) => {
  const api = new Api();
  const endpoint = "/register/basic";
  const response = api.post<AuthResponse>(endpoint, credentials);
  return response;
};

export const userVerify = () => {
  const api = new Api(true);
  const endpoint = "/verify";
  const response = api.post<string>(endpoint);
  return response;
};
