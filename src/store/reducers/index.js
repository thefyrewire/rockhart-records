import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import records from '../reducers/records';

const rootReducer = combineReducers({ auth, records });

export default rootReducer;