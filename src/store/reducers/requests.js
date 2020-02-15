import { ADD_REQUEST } from '../types/requests';

const initialState = [];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_REQUEST:
      // return {
      //   ...state,
      //   requests: [...state.requests, action.request]
      // }
      return [...state, action.request]
    default:
      return state;
  }
}