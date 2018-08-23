const initialState = {
  isRequesting: false,
  isLoaded: false,
  data: {},
  errorMessage: ''
};

const userData = (state=initialState, action) => {
  switch (action.type) {

    // fetch a user's info
    case 'FETCH_USER_REQUEST':
      return Object.assign({}, state, { isRequesting: true });

    case 'FETCH_USER_SUCCESS':
      return Object.assign({}, state, { isRequesting: false, data: action.payload, isLoaded: true });
    
    case 'FETCH_USER_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    // update a user for borrowing books
    case 'UPDATE_USER_BORROWBOOKS_REQUEST':
      return Object.assign({}, state, { isRequesting: true });
    
    case 'UPDATE_USER_BORROWBOOKS_SUCCESS':
      const updatedDataBorrow = Object.assign({}, state.data, { borrowedBooks: [...state.data.borrowedBooks, action.payload.bookinstance] });
      return Object.assign({}, state, { isRequesting: false, data: updatedDataBorrow, isLoaded: true });
    
    case 'UPDATE_USER_BORROWBOOKS_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    // update a user for returning books
    case 'UPDATE_USER_RETURN_REQUEST':
      return Object.assign({}, state, { isRequesting: true });
    
    case 'UPDATE_USER_RETURN_SUCCESS':
      const updatedDataReturn = Object.assign({}, state.data, { borrowedBooks: [...state.data.borrowedBooks].filter(bookinstance => bookinstance._id !== action.payload.bookinstanceId) });
      return Object.assign({}, state, { isRequesting: false, data: updatedDataReturn, isLoaded: true });
    
    case 'UPDATE_USER_RETURN_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    // update a user info
    case 'UPDATE_USER_INFO_REQUEST':
      const updatedDataInfo = Object.assign({}, state.data, { 
        email: action.payload.email, 
        username: action.payload.username, 
        firstname: action.payload.firstname, 
        lastname: action.payload.lastname
       });
      return Object.assign({}, state, { isRequesting: true, data: updatedDataInfo });
    
    case 'UPDATE_USER_INFO_SUCCESS':
      return Object.assign({}, state, { isRequesting: false, data: action.payload.user, isLoaded: true });
    
    case 'UPDATE_USER_INFO_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    default:
      return state;
  }
};

export default userData;