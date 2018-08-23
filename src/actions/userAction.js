import { 
  apiUserRead, 
  apiUserProfileUpdate,
  apiUserBorrowBooks,
  apiUserReturnBooks
} from '../middlewares/api';

import { delay } from '../utils';

export const userRead = authData => dispatch => {
  dispatch({ type: 'FETCH_USER_REQUEST' });

  return apiUserRead(authData).then(response => dispatch({ 
    type: 'FETCH_USER_SUCCESS', 
    payload: response 
  })).catch(error => dispatch({ 
    type: 'FETCH_USER_FAILURE',
    message: error.message || 'Error occured while fetching user'
  }));

};


export const userBorrowBooks = (authData, bookinstanceId) => dispatch => {
  dispatch({ type: 'UPDATE_USER_BORROWBOOKS_REQUEST' });

  return apiUserBorrowBooks(authData, bookinstanceId).then(response => 
    delay(300).then(() => dispatch({ 
      type: 'UPDATE_USER_BORROWBOOKS_SUCCESS', 
      payload: response 
    }))
  ).catch(error => dispatch({ 
    type: 'UPDATE_USER_BORROWBOOKS_FAILURE',
    message: error.message || 'Error occured while fetching user'
  }));
};


export const userReturnBooks = (authData, bookinstanceId) => dispatch => {
  dispatch({ type: 'UPDATE_USER_RETURN_REQUEST' });

  return apiUserReturnBooks(authData, bookinstanceId).then(response => 
    delay(700).then(() => dispatch({ 
      type: 'UPDATE_USER_RETURN_SUCCESS', 
      payload: response 
    }))
  ).catch(error => dispatch({ 
    type: 'UPDATE_USER_RETURN_FAILURE',
    message: error.message || 'Error occured while fetching user'
  }));
};

export const userProfileUpdate = (authData, data) => dispatch => {
  dispatch({ 
    type: 'UPDATE_USER_INFO_REQUEST',
    payload: data
  });

  return apiUserProfileUpdate(authData, data).then(response => 
    delay(1000).then(() => dispatch({ 
      type: 'UPDATE_USER_INFO_SUCCESS', 
      payload: response 
    }))
  ).catch(error => dispatch({ 
    type: 'UPDATE_USER_INFO_FAILURE',
    message: error.message || 'Error occured while updating user info'
  }));  
};