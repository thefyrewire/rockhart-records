import { SET_REQUESTS, ADD_REQUEST } from '../types/requests';

const initialState = [];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return [...action.requests]
    case ADD_REQUEST:
      return [...state, action.request]
    default:
      return state;
  }
}