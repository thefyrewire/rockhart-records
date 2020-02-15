import { SET_RECORDS, ADD_RECORD, UPDATE_RECORD, REMOVE_RECORD, LOADING_RECORDS, LOADED_RECORDS } from '../types/records';

const initialState = {
  records: [],
  loading: true
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
    case REMOVE_RECORD:
      return {
        ...state,
        records: state.records.filter(record => record.id !== action.id)
      }
    case LOADING_RECORDS:
      return {
        ...state,
        loading: true
      }
    case LOADED_RECORDS:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}