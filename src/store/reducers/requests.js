import { SET_REQUESTS, ADD_REQUEST, PROMOTE_REQUEST, DELETE_REQUEST } from '../types/requests';

const initialState = [];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return [...action.requests]
    case ADD_REQUEST:
      return [...state, action.request]
    case PROMOTE_REQUEST: {
      const index = state.findIndex(request => request.id === action.id);
      if (index === -1) return state;
      const newState = state.slice();
      newState.unshift(...newState.splice(index, 1));
      return newState;
    }
    case DELETE_REQUEST:
      return state.filter(request => request.id !== action.id);
    default:
      return state;
  }
}