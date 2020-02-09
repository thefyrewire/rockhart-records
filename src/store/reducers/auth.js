import { LOGIN_STATUS } from '../types/auth';

const initialState = {
  authenticated: false,
  user: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return Object.assign({}, state, {
        authenticated: action.status.authenticated,
        user: action.status.user
      });
    default:
      return state;
  }
}