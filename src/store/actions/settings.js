import ky from 'ky';
import { LOADED_SETTINGS, CHANGE_SETTING } from "../types/settings";

export const setLoadedSettings = (settings) => {
  return {
    type: LOADED_SETTINGS,
    settings
  }
}

export const setChangeSetting = (settings) => {
  return {
    type: CHANGE_SETTING,
    settings
  }
}

export const getSettings = () => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await ky.get('/api/settings').json();
      dispatch(setLoadedSettings(response));
      res();

    } catch (error) {
      console.log(error.message);
      rej();
    }
  });
}

export const changeSetting = (setting) => (dispatch) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await ky.put('/api/settings', { json: { setting } }).json();
      dispatch(setChangeSetting(response));
      res();

    } catch (error) {
      console.log(error.message);
      rej();
    }
  });
}