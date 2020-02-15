import { SET_REQUESTS, MADE_ADD_REQUEST, ADD_REQUEST } from '../types/requests';
import ky from 'ky';

export const setRequests = (requests) => {
  return {
    type: SET_REQUESTS,
    requests
  }
}

export const madeAddRequest = () => {
  return {
    type: MADE_ADD_REQUEST
  }
}

export const addRequest = (request) => {
  return {
    type: ADD_REQUEST,
    request
  }
}

export const getRequests = () => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await ky.get('/api/requests').json();
      dispatch(setRequests(response));
      res();

    } catch (error) {
      console.log(error.message);
      rej();
    }
  })
}

export const createRequest = (request) => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      await ky.post(`/api/requests/new/${request}`);
      dispatch(madeAddRequest());
      res();

    } catch (error) {
      console.log(error.message);
      rej();
    }
  });
}