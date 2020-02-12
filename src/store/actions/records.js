import { SET_RECORDS, ADD_RECORD } from '../types/records';
import ky from 'ky';

export const setRecords = (records) => {
  return {
    type: SET_RECORDS,
    records
  }
}

export const addRecord = (record) => {
  return {
    type: ADD_RECORD,
    record
  }
}

export const getRecords = () => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await ky.get('/api/records').json();
      dispatch(setRecords(response.records));
      res();

    } catch (error) {
      console.log(error.message);
      rej(error.message);
    }
  });
}

export const createRecord = (record) => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await ky.post('/api/records', { json: record }).json();
      dispatch(addRecord(response.record));
      res();

    } catch (error) {
      console.log(error.message);
      rej(error.message);
    }
  });
}