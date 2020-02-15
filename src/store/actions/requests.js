import { SET_REQUESTS, SEND_ADD_REQUEST, ADD_REQUEST, SEND_PROMOTE_REQUEST, PROMOTE_REQUEST, SEND_DELETE_REQUEST, DELETE_REQUEST } from '../types/requests';
import ky from 'ky';

export const setRequests = (requests) => {
  return {
    type: SET_REQUESTS,
    requests
  }
}

export const addRequest = (request) => {
  return {
    type: ADD_REQUEST,
    request
  }
}

export const promoteRequest = (id) => {
  return {
    type: PROMOTE_REQUEST,
    id
  }
}

export const deleteRequest = (id) => {
  return {
    type: DELETE_REQUEST,
    id
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

export const createRequest = (id) => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      dispatch({ type: SEND_ADD_REQUEST });
      await ky.post(`/api/requests/new/${id}`);
      res();

    } catch (error) {
      console.log(error.message);
      rej();
    }
  });
}

export const sendPromoteRequest = (id) => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      dispatch({ type: SEND_PROMOTE_REQUEST });
      await ky.put(`/api/requests/promote/${id}`);
      res();

    } catch (error) {
      console.log(error.message);
      rej();
    }
  });
}

export const sendDeleteRequest = (id) => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      dispatch({ type: SEND_DELETE_REQUEST });
      await ky.delete(`/api/requests/${id}`);
      res();

    } catch (error) {
      console.log(error.message);
      rej();
    }
  });
}