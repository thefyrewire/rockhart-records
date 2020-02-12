import { SET_RECORDS, ADD_RECORD } from '../types/records';

const initialState = {
  records: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RECORDS:
      return {
        ...state,
        records: action.records
      }
    case ADD_RECORD:
      return {
        ...state,
        records: [...state.records, action.record]
      }
    default:
      return state;
  }
}