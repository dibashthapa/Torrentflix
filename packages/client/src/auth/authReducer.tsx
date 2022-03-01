import {State, ActionType} from './authContext';

export function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'INITIALIZED':
      return {
        ...state,
        isLoading: false,
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isUserLoggedIn: true,
        errorMessage: '',
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
        isUserLoggedIn: false,
      };
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        isLoading: true,
      };

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        currentUser: action.payload?.user,
        isLoading: false,
        isUserLoggedIn: true,
      };
    case 'SIGNUP_ERROR':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
        isUserLoggedIn: false,
      };

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        currentUser: action.payload?.user,
        isLoading: false,
        isUserLoggedIn: true,
        errorMessage: '',
      };
    case 'GET_TOKEN':
      return {
        ...state,
      };
    case 'SET_TOKEN':
      return {
        ...state,
      };
    case 'VERIFIED_REQUEST':
      return {
        ...state,
        isLoading: true,
        isUserLoggedIn: false,
      };

    case 'VERIFIED_SUCESS':
      return {
        ...state,
        currentUser: action.payload?.user,
        isLoading: false,
        errorMessage: undefined,
        isUserLoggedIn: true,
      };
    case 'VERIFIED_ERROR':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
        isUserLoggedIn: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        currentUser: undefined,
        isUserLoggedIn: false,
      };

    default:
      return state;
  }
}
