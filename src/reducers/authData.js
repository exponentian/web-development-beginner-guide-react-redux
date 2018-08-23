const initialState = {
  isRequesting: false,
  data: {},
  isLoggedIn: false,
  errorMessage: ''
};


const authData = (state=initialState, action) => {
  switch(action.type) {

    // user login
    case 'USER_LOGIN_REQUEST':
      return Object.assign({}, state, { isRequesting: true });

    case 'USER_LOGIN_SUCCESS':
      return Object.assign({}, state, { isRequesting: false, isLoggedIn: true, data: action.payload });

    case 'USER_LOGIN_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    // user singup
    case 'USER_SIGNUP_REQUEST':
      return Object.assign({}, state, { isRequesting: true });

    case 'USER_SIGNUP_SUCCESS':
      return Object.assign({}, state, { isRequesting: false, isLoggedIn: true, data: action.payload });

    case 'USER_SIGNUP_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    // user logout
    case 'USER_LOGOUT_REQUEST':
      return Object.assign({}, state, { isRequesting: true });

    case 'USER_LOGOUT_SUCCESS':
      return state;

    case 'USER_LOGOUT_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    // user password
    case 'CHANGE_USER_PASSWORD_REQUEST':
      return Object.assign({}, state, { isRequesting: true });

    case 'CHANGE_USER_PASSWORD_SUCCESS':
      return Object.assign({}, state, { isRequesting: false, isLoggedIn: true });

    case 'CHANGE_USER_PASSWORD_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    default:
      return state;
  }
};

export default authData;