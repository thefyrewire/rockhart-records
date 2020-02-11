import { SET_RECORDS } from '../types/records';
import ky from 'ky';

export const setRecords = (records) => {
  return {
    type: SET_RECORDS,
    records
  }
}

// export const getRecords = () => async (dispatch) => {
//   try {
//     const response = await ky.get('/api/records').json();
//     dispatch(setRecords(response.records));
//     return;

//   } catch (error) {
//     console.log(error.message);
//   }
// }

export const getRecords = () => (dispatch) => {
  try {
    return new Promise(async (res, rej) => {
      const response = await ky.get('/api/records').json();
      dispatch(setRecords(response.records));
      res();
    });

  } catch (error) {
    console.log(error.message);
  }
}