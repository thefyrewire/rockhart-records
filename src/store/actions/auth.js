import ky from 'ky';
import { LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOGOUT } from "../types/auth";

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

export const userLoggedOut = () => {
  return {
    type: USER_LOGOUT,
    status: {
      authenticated: false,
      user: null
    }
  }
}

export const checkLoginStatus = () => async (dispatch) => {
  try {
    const response = await ky('/auth/me', { headers: { credentials: 'include' }}).json();
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
    dispatch(userLoggedOut());

  } catch (err) {
    console.warn(err);
    dispatch(userLoggedOut());
  }
}