import axios from 'axios';
import {loginService, registerService, userVerify} from '../services/authService';
import {payload, Dispatch} from './authContext';

// export async function getUser(dispatch: Dispatch) {
//   try {
//     const user = await userService.getProfile()

//     if (user) {
//       dispatch({ type: 'VERIFIED_SUCESS', payload: { user: user } })
//       localStorage.setItem('user', JSON.stringify(user))
//     } else {
//       dispatch({ type: 'VERIFIED_ERROR', error: 'Connection Error' })
//     }
//   } catch (err) {
//     if (axios.isAxiosError(err)) {
//       dispatch({
//         type: 'VERIFIED_ERROR',
//         error: err.response?.data as string,
//       })
//     }
//   }
// }
//
export async function verifyUser(dispatch: Dispatch) {
  try {
    await userVerify();
    dispatch({type: 'VERIFIED_SUCESS'});
  } catch (err) {
    dispatch({type: 'VERIFIED_ERROR'});
  }
}

export async function loginUser(
  dispatch: Dispatch,
  payload: payload['loginCredentials']
) {
  try {
    dispatch({
      type: 'LOGIN_REQUEST',
    });

    const response = await loginService(payload);
    const {accessToken} = response.data.data;

    if (accessToken) {
      dispatch({type: 'LOGIN_SUCCESS'});
      localStorage.setItem('token', accessToken);
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      dispatch({type: 'LOGIN_ERROR', error: err.response?.data.message});
      return;
    }
    if (err instanceof Error) {
      dispatch({type: 'LOGIN_ERROR', error: err.message});
      return;
    }
  }
}

export async function registerUser(
  dispatch: Dispatch,
  payload: payload['registerCredentials']
) {
  try {
    dispatch({
      type: 'SIGNUP_REQUEST',
    });

    const response = await registerService(payload);
    const successResponse = response.data.data;

    if (successResponse) {
      dispatch({type: 'SIGNUP_SUCCESS'});
      return successResponse;
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      dispatch({type: 'SIGNUP_ERROR', error: err.response?.data.message});
      return;
    }
    dispatch({type: 'SIGNUP_ERROR', error: err.message});
  }
}
export function logoutUser(dispatch: Dispatch) {
  localStorage.removeItem('token');
  dispatch({type: 'LOGOUT'});
}
