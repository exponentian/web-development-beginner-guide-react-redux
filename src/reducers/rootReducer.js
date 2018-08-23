import { combineReducers } from 'redux';
import authData from './authData';
import userData from './userData';
import bookinstanceData from './bookinstanceData';

const appReducer = combineReducers({
  authData,
  userData,
  bookinstanceData
});

const rootReducer = (state, action) => {

  // reset state when log out
  if (action.type === 'USER_LOGOUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;