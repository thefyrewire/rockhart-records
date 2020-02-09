import { LOGIN_STATUS } from '../types/auth';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return state;
    default:
      return state;
  }
}