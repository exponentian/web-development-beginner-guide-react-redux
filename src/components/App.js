import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';
import { userRead } from '../actions/userAction';
import { bookinstancesRead } from '../actions/bookinstanceAction';


const mapStateToProps = state => ({
  authData: state.authData,
  userData: state.userData,
  bookinstanceData: state.bookinstanceData,
});

class App extends React.Component {

  // React.Component about componentDidMount and componentDidUpdate
  // https://reactjs.org/docs/react-component.html
  componentDidMount = () => {
    const { authData } = this.props;

    if ( authData.isLoggedIn ) {
      this.fetchData(authData.data);
    }
  };

  componentDidUpdate = prevProps => {
    const { authData } = this.props;

    if ( authData.isLoggedIn && !prevProps.authData.isLoggedIn ) {
      this.fetchData(authData.data);
    }
  };

  fetchData = authData => {
    this.props.userRead(authData);
    this.props.bookinstancesRead(authData);
  };

  render() {
    const { authData, userData, bookinstanceData } = this.props;

    // check whether userData and bookinstacneData are loaded or not
    if ( authData.isLoggedIn && (!userData.isLoaded || !bookinstanceData.isLoaded) ) {
      return (
        <div>
          <p>
            Loading...<br />
            Please retry if it is still loading
          </p>
          <button type="button" onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }

    // return errors if errors exist
    const errors = userData.errorMessage || bookinstanceData.errorMessage;
    if ( errors !== '' ) return <div>{errors}</div>;

    return (
      <BrowserRouter>
        <div className="app">
          { authData.isLoggedIn ? 
            <PrivateLayout {...this.props} /> : 
            <PublicLayout /> }
          
          <footer className="footer">
            <hr />
            <div>Copyright 2018 Local Library. All right reserved.</div>
          </footer>
        </div>
      </BrowserRouter>  
    );
  }
}


// Typechecking With PropTypes
// https://reactjs.org/docs/typechecking-with-proptypes.html
App.propTypes = {
  authData: PropTypes.object,
  userData: PropTypes.object,
  bookinstanceData: PropTypes.object
};


export default connect(mapStateToProps, { 
  userRead, 
  bookinstancesRead 
})(App);
