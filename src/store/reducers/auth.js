import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../types/auth';

const initialState = {
  authenticated: false,
  user: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authenticated: action.status.authenticated,
        user: action.status.user
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        authenticated: false,
        user: null
      });
    default:
      return state;
  }
}