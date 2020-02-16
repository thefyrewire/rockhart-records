import { SET_REQUESTS, ADD_REQUEST, PROMOTE_REQUEST, DELETE_REQUEST, NEXT_REQUEST, CLEAR_CURRENT_REQUEST } from '../types/requests';

const initialState = {
  requests: [],
  current: null,
  history: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {
        ...state,
        requests: action.requests.requests,
        current: action.requests.current,
        history: action.requests.history
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
        current: action.request,
        history: state.current
          ? [...state.history, state.current].sort((a, b) => new Date(a.updated_at) < new Date(b.updated_at)).slice(0, 10)
          : state.history
      }
    case CLEAR_CURRENT_REQUEST:
      return {
        ...state,
        current: null,
        history: [...state.history, action.request].sort((a, b) => new Date(a.updated_at) < new Date(b.updated_at)).slice(0, 10)
      }
    default:
      return state;
  }
}