import { combineReducers } from 'redux';
import jobListingsReducer from './jobListingsReducer';

const rootReducer = combineReducers({
  jobListings: jobListingsReducer,
});

export default rootReducer;
