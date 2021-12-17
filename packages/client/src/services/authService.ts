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

const api = new Api();

export const loginService = (credentials: LoginCredentials | undefined) => {
  const endpoint = "/login/basic";
  const response = api.post<AuthResponse>(endpoint, credentials);
  return response;
};

export const registerService = (credentials: SignupCredential) => {
  const endpoint = "/register/basic";
  const response = api.post<AuthResponse>(endpoint, credentials);
  return response;
};
