import { 
  apiUserLogin, 
  apiUserSignup,
  apiUserChangePassword
} from '../middlewares/api';
import { saveState, removeState } from '../localStorage.js';
import { delay } from '../utils';

export const loggedInSuccess = data => ({ 
  type: 'USER_LOGIN_SUCCESS',
  payload: data
});

export const userLogin = data => dispatch => {
  dispatch({ type: 'USER_LOGIN_REQUEST' });

  return apiUserLogin(data).then(response => {
    if ( saveState(response) ) {
      return delay(1000).then(() => dispatch( loggedInSuccess(response) ));

    } else {
      return dispatch({ 
        type: 'USER_LOGIN_FAILURE',
        message: 'Failed to save state'
      });
    }

  }).catch(error => dispatch({ 
    type: 'USER_LOGIN_FAILURE',
    message: error.message || 'Failed to log in. Please try it again.'
  }));
};

export const userSignup = data => dispatch => {
  dispatch( { type: 'USER_SIGNUP_REQUEST' } );  

  return apiUserSignup(data).then(response => {
    if ( saveState(response) ) {
      return delay(1000).then(() => dispatch( { 
        type: 'USER_SIGNUP_SUCCESS', 
        payload: response 
      }));

    } else {
      return dispatch({ 
        type: 'USER_SIGNUP_FAILURE', 
        payload: 'Failed to save state'
      });
    }

  }).catch(error => dispatch({ 
    type: 'USER_SIGNUP_FAILURE', 
    payload: error.message || 'Error occured while creating an account'
  }));
};

export const userLogout = () => dispatch => {
  dispatch({ type: 'USER_LOGOUT_REQUEST' });
  
  if ( removeState() ) {
    return delay(1000).then(() => dispatch({ 
      type: 'USER_LOGOUT_SUCCESS' 
    }));

  } else { 
    return dispatch({ 
      type: 'USER_LOGOUT_FAILURE',
      message: 'Error occured while logging out'
    });
  }
};


export const userChangePassword = (authData, data) => dispatch => {
  dispatch({ 
    type: 'CHANGE_USER_PASSWORD_REQUEST',
    payload: data
  });

  return apiUserChangePassword(authData, data).then(response => 
    delay(1000).then(() => dispatch({ 
      type: 'CHANGE_USER_PASSWORD_SUCCESS', 
      payload: response 
    }))
  ).catch(error => dispatch({ 
    type: 'CHANGE_USER_PASSWORD_FAILURE',
    message: error.message || 'Error occured while changing user password'
  }));  
};