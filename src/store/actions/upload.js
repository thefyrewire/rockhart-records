import { UPLOADED_IMAGE } from '../types/upload';
import ky from 'ky';

export const uploadImage = (file) => (dispatch) => {
  return new Promise(async (res, rej) => {
    const response = await ky.post('/api/upload', { body: file }).json();
    dispatch({ type: UPLOADED_IMAGE });
    res(response);
  });
}