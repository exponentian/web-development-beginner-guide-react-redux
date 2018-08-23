import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import rootReducer from '../reducers/rootReducer';
import { loadState } from '../localStorage';
import { loggedInSuccess } from '../actions/authAction';


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


// keep a user logged in after login or signup
const persistedState = loadState();
if (persistedState) store.dispatch( loggedInSuccess(persistedState) );


store.subscribe(() => {
  // please uncomment if you want to display current state
  //console.log('current state: ', store.getState());
});


const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;