import ky from 'ky';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../types/auth";

export const setLoginSuccess = (status) => {
  return {
    type: LOGIN_SUCCESS,
    status
  }
}

export const setLoginFailure = () => {
  return {
    type: LOGIN_FAILURE,
    status: {
      authenticated: false,
      user: null
    }
  }
}

export const checkLoginStatus = () => async (dispatch, getState) => {
  try {
    const response = await ky('/auth/me').json();
    console.log(response);
    dispatch(setLoginSuccess(response));

  } catch (err) {
    console.warn(err);
    dispatch(setLoginFailure());
  }
}