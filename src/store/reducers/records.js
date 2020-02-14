import { SET_RECORDS, ADD_RECORD, UPDATE_RECORD } from '../types/records';

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
    case UPDATE_RECORD:
      return {
        ...state,
        records: state.records.map(record => record = (record.id === action.id) ? action.record : record)
      }
    default:
      return state;
  }
}