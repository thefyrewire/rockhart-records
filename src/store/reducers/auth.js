import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../types/auth';

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
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        authenticated: false,
        user: null
      });
    default:
      return state;
  }
}