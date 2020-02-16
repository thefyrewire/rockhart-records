import { SET_REQUESTS, ADD_REQUEST, PROMOTE_REQUEST, DELETE_REQUEST, NEXT_REQUEST } from '../types/requests';

const initialState = {
  requests: [],
  current: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {
        ...state,
        requests: [...action.requests]
      }
    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.request]
      }
    case PROMOTE_REQUEST: {
      const index = state.requests.findIndex(request => request.id === action.id);
      if (index === -1) return state;
      const newRequestsState = state.requests.slice();
      newRequestsState.unshift(...newRequestsState.splice(index, 1));
      return {
        ...state,
        requests: newRequestsState
      };
    }
    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(request => request.id !== action.id)
      };
    case NEXT_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(request => request.id !== action.request.id),
        current: action.request
      }
    default:
      return state;
  }
}