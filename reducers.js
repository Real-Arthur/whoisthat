import { combineReducers } from 'redux';
import userReducer from './userReducer';
import libraryReducer from './libraryReducer';
 
export default combineReducers({
  userReducer,
  libraryReducer
});