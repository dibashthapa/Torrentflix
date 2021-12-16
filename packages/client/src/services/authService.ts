import { Api } from "./apiService";

interface LoginCredentials {
  email: string;
  password: string;
}


const api = new Api();

export const loginService = (credentials: LoginCredentials) => {
  const endpoint = "/login/basic";
  return api.post(endpoint, credentials);
};
