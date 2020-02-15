import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import records from '../reducers/records';
import requests from '../reducers/requests';

const rootReducer = combineReducers({ auth, records, requests });

export default rootReducer;