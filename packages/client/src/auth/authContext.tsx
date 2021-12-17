import { createContext } from "react";
import { LoginCredentials, SignupCredential } from "../services/authService";

export interface User {
  name: string;
  email: string;
}
export interface payload {
  token?: string;
  user?: User;
  loginCredentials?: LoginCredentials;
  registerCredentials?: SignupCredential;
}
export type ActionType = {
  type:
    | "LOGIN_REQUEST"
    | "LOGIN_SUCCESS"
    | "LOGIN_ERROR"
    | "SIGNUP_REQUEST"
    | "SIGNUP_SUCCESS"
    | "SIGNUP_ERROR"
    | "FETCH_USER_SUCCESS"
    | "FETCH_USER_ERROR"
    | "VERIFIED_SUCESS"
    | "VERIFIED_ERROR"
    | "LOGOUT"
    | "INITIALIZED"
    | "GET_TOKEN"
    | "SET_TOKEN"
    | "AUTH_SUCCESS";
  payload?: payload;
  error?: string;
};

export type Dispatch = (action: ActionType) => void;
export type State = {
  isUserLoggedIn?: boolean;
  currentUser?: User;
  isLoading?: boolean;
  errorMessage?: string;
};
export const AuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);
