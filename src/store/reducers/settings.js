import { LOADED_SETTINGS, CHANGE_SETTING } from '../types/settings';

const initialState = {
  requests_enabled: false,
  max_user_requests: 5,
  max_total_requests: 50
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOADED_SETTINGS:
    case CHANGE_SETTING:
      return action.settings;
    default:
      return state;
  }
}