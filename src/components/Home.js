import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import BookInstance from './BookInstance';
import { userBorrowBooks } from '../actions/userAction';
import { bookinstanceMakeLoan } from '../actions/bookinstanceAction';


class Home extends React.Component {

  // filter by book status
  filterBooks = (bookinstances) => {
    const booksAvailable = [];

    for (const bookinstance of bookinstances) {
      if (bookinstance.status === 'Available') {
        booksAvailable.push(bookinstance);
      }
    }
    
    return booksAvailable;
  };

  handleCheckout = bookinstanceId => {
    const { 
      authData, 
      bookinstanceMakeLoan, 
      userBorrowBooks
    } = this.props;

    bookinstanceMakeLoan(authData.data, bookinstanceId).then(bookinstanceResult => {

      if (bookinstanceResult.type === 'UPDATE_BOOKINSTANCE_MAKELOAN_SUCCESS'
        && bookinstanceResult.payload.bookinstance.status === 'Loaned') {
        
        userBorrowBooks(authData.data, bookinstanceId).then(userResult => {
          if (userResult.type === 'UPDATE_USER_BORROWBOOKS_SUCCESS'
            && userResult.payload.bookinstance._id === bookinstanceId) {
            alert("Successfully borrowed");
          }
        });
      }

    });
  };


  render() {
    const { authData, bookinstanceData } = this.props;

    const bookinstances = {
      available: this.filterBooks(bookinstanceData.data)
    }

    if (bookinstances.available.length < 1) {
      return (
        <div>
          <Header authData={authData} />
          <p>Sorry. There no books available to borrow.</p>
        </div>
      );
    }

    const bookinstanceList = bookinstances.available.map((bookinstance, i) => 
      <BookInstance key={i} handleCheckout={this.handleCheckout} {...bookinstance} />
    );
    
    return (
      <div>
        <Header authData={authData} />

        <h3>A list of books available</h3>
        {bookinstanceList}
      </div>
    );
  }
}


Home.propTypes = {
  authData: PropTypes.object,
  bookinstanceData: PropTypes.object,
  userBorrowBooks: PropTypes.func,
  bookinstanceMakeLoan: PropTypes.func
};


export default connect(null, {
  userBorrowBooks,
  bookinstanceMakeLoan
})(Home);