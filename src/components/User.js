import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import { userReturnBooks } from '../actions/userAction';
import { bookinstanceMakeAvailable } from '../actions/bookinstanceAction';

class User extends React.Component {

  handleReturn = (bookinstanceId) => {
    const { 
      authData, 
      bookinstanceMakeAvailable,
      userReturnBooks
    } = this.props;

    bookinstanceMakeAvailable(authData.data, bookinstanceId).then(bookinstanceResult => {

      if (bookinstanceResult.type === 'UPDATE_BOOKINSTANCE_AVAILABLE_SUCCESS'
        && bookinstanceResult.payload.bookinstance.status === 'Available') {

        userReturnBooks(authData.data, bookinstanceId).then(userResult => {

          if (userResult.type === 'UPDATE_USER_RETURN_SUCCESS'
            && userResult.payload.bookinstanceId === bookinstanceId) {
            alert("Successfully returned");
          }
        });
      }

    });
  };

  render() {
    const { match, authData, userData } = this.props;

    const borrowedBooks = userData.data.borrowedBooks.map((bookinstance, i) => {
      return (<BorrowedBooks key={i} order={i+1} handleReturn={this.handleReturn} {...bookinstance} />);
    });

    return (
      <div>
        <Header authData={authData} />

        <h2>
          Profile (<Link to={`${match.url}/edit`}>Edit</Link>)
        </h2>

        <ul>
          <li>Username: {userData.data.username}</li>
          <li>Email: {userData.data.email}</li>
          <li>First Name: {userData.data.firstname}</li>
          <li>Last Name: {userData.data.lastname}</li>
        </ul>

        <h3>My Books Borrowed</h3>

        { userData.data.borrowedBooks.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Due Back</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { borrowedBooks }
            </tbody>
          </table>
          : <div>No borrowed books found.</div> }

      </div>
    );
  }
}


User.propTypes = {
  match: PropTypes.object,
  authData: PropTypes.object,
  userData: PropTypes.object,
  userReturnBooks: PropTypes.func,
  bookinstanceMakeAvailable: PropTypes.func
};



class BorrowedBooks extends React.Component {
  handleReturn = () => {
    this.props.handleReturn(this.props._id);
  };

  render() {
    const { order, book, due_back } = this.props;

    return (
      <tr>
        <td>{ order }</td>
        <td>{ due_back.split('T')[0] }</td>
        <td>{ book.title }</td>
        <td>
          <button type="button" onClick={this.handleReturn}>Return</button>
        </td>
      </tr>
    );
  }
}


BorrowedBooks.propTypes = {
  order: PropTypes.number,
  book: PropTypes.object,
  due_back: PropTypes.string
};


export default withRouter( connect(null, {
  userReturnBooks,
  bookinstanceMakeAvailable
})(User) );