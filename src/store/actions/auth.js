import { LOGIN_STATUS } from "../types/auth";

export const setLoginStatus = (status) => {
  return {
    type: LOGIN_STATUS,
    status
  }
}

export const checkLoginStatus = () => async (dispatch, getState) => {
  return fetch('/auth/me').then(d => d.json()).then(res => {
    console.log(res);
    dispatch(setLoginStatus(res));
  });
}