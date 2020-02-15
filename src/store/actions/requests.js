import { ADD_REQUEST } from '../types/requests';
import ky from 'ky';

export const addRequest = (request) => {
  return {
    type: ADD_REQUEST,
    request
  }
}

export const createRequest = (request) => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await ky.post(`/api/requests/new/${request}`).json();
      console.log(response);
      dispatch(addRequest(response));
      res();

    } catch (error) {
      console.log(error.message);
      rej();
    }
  });
}