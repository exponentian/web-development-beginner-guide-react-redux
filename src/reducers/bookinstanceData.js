const initialState = {
  isRequesting: false,
  data: [],
  isLoaded: false,
  errorMessage: ''
};

const bookinstanceData = (state=initialState, action) => {
  switch (action.type) {

    // fetch bookinstances
    case 'FETCH_BOOKINSTANCES_REQUEST':
      return Object.assign({}, state, { isRequesting: true });
    
    case 'FETCH_BOOKINSTANCES_SUCCESS':
      return Object.assign({}, state, { isRequesting: false, data: action.payload, isLoaded: true });
    
    case 'FETCH_BOOKINSTANCES_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    // make a bookinstance loaned
    case 'UPDATE_BOOKINSTANCE_MAKELOAN_REQUEST':
      return Object.assign({}, state, { isRequesting: true });
    
    case 'UPDATE_BOOKINSTANCE_MAKELOAN_SUCCESS':
      const updatedDataMakeLoan = state.data.map(bookinstance => 
        (bookinstance._id === action.payload.bookinstance._id) ? 
        Object.assign({}, bookinstance, { status: 'Loaned' }) : 
        bookinstance 
      );
      return Object.assign({}, state, { isRequesting: false, data: updatedDataMakeLoan, isLoaded: true });

    case 'UPDATE_BOOKINSTANCE_MAKELOAN_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    // make a bookinstance available
    case 'UPDATE_BOOKINSTANCE_AVAILABLE_REQUEST':
      return Object.assign({}, state, { isRequesting: true });
    
    case 'UPDATE_BOOKINSTANCE_AVAILABLE_SUCCESS':
      const updatedDataAvailable = state.data.map(bookinstance => 
        (bookinstance._id === action.payload.bookinstance._id) ? 
        Object.assign({}, bookinstance, { status: 'Available' }) : 
        bookinstance 
      );
      return Object.assign({}, state, { isRequesting: false, data: updatedDataAvailable, isLoaded: true });

    case 'UPDATE_BOOKINSTANCE_AVAILABLE_FAILURE':
      return Object.assign({}, state, { isRequesting: false, errorMessage: action.message });


    default:
      return state;
  }
};

export default bookinstanceData;