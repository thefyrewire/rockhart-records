import { SET_RECORDS } from '../types/records';

const initialState = {
  records: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RECORDS:
      return {
        // ...state,
        records: [...action.records, ...state.records]
      }
    default:
      return state;
  }
}