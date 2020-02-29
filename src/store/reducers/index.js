import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import records from '../reducers/records';
import requests from '../reducers/requests';
import settings from '../reducers/settings';

const rootReducer = combineReducers({ auth, records, requests, settings });

export default rootReducer;