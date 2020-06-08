// Imports
import { combineReducers } from 'redux';

import bankReducer from './reducers/bankReducer';

// Initializations
const rootReducer = combineReducers({
  bank: bankReducer,
});

// Exports
export default rootReducer;
