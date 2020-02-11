import ky from 'ky';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../types/auth";

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

export const setLogoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
    status: {
      authenticated: false,
      user: null
    }
  }
}

export const setLogoutFailure = () => {
  return {
    type: LOGOUT_FAILURE,
    status: {
      authenticated: false,
      user: null
    }
  }
}

export const checkLoginStatus = () => async (dispatch) => {
  try {
    const response = await ky('/api/users/me', { headers: { credentials: 'include' }}).json();
    console.log(response);
    dispatch(setLoginSuccess(response));

  } catch (err) {
    console.warn(err);
    dispatch(setLoginFailure());
  }
}

export const userLogout = () => async (dispatch) => {
  try {
    await ky('/auth/logout').json();
    dispatch(setLogoutSuccess());

  } catch (err) {
    console.warn(err);
    dispatch(setLogoutFailure());
  }
}