import { 
  apiBookinstancesRead, 
  apiBookinstanceMakeLoan,
  apiBookinstanceMakeAvailable
} from '../middlewares/api';

import { delay } from '../utils';

export const bookinstancesRead = authData => dispatch => {
  dispatch({ type: 'FETCH_BOOKINSTANCES_REQUEST' });

  return apiBookinstancesRead(authData).then(response => dispatch({ 
    type: 'FETCH_BOOKINSTANCES_SUCCESS', 
    payload: response 
  })).catch(error => dispatch({ 
    type: 'FETCH_BOOKINSTANCES_FAILURE',
    message: error.message || 'Error occured while fetching bookinstances'
  }));
};


export const bookinstanceMakeLoan = (authData, bookinstanceId) => dispatch => {
  dispatch({ type: 'UPDATE_BOOKINSTANCE_MAKELOAN_REQUEST' });

  return apiBookinstanceMakeLoan(authData, bookinstanceId).then(response => 
    delay(700).then(() => dispatch({ 
      type: 'UPDATE_BOOKINSTANCE_MAKELOAN_SUCCESS', 
      payload: response 
    }))
  ).catch(error => dispatch({ 
    type: 'UPDATE_BOOKINSTANCE_MAKELOAN_FAILURE',
    message: error.message || 'Error occured while updating bookinstance-make-loan'
  }));
};

export const bookinstanceMakeAvailable = (authData, bookinstanceId) => dispatch => {
  dispatch({ type: 'UPDATE_BOOKINSTANCE_AVAILABLE_REQUEST' });

  return apiBookinstanceMakeAvailable(authData, bookinstanceId).then(response => 
    delay(300).then(() => dispatch({ 
      type: 'UPDATE_BOOKINSTANCE_AVAILABLE_SUCCESS', 
      payload: response 
    }))
  ).catch(error => dispatch({ 
    type: 'UPDATE_BOOKINSTANCE_AVAILABLE_FAILURE',
    message: error.message || 'Error occured while updating bookinstance-make-available'
  }));
};