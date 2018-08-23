import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userLogout } from '../actions/authAction';
import { Sep } from '../utils';

class Header extends React.Component {

  handleLogout = () => {
    const { history, userLogout } = this.props;
    userLogout().then(result => history.push('/'));
  };

  render() {
    const { authData } = this.props;

    return (
      <header>
        <nav>
          <Link to='/home'>Home</Link>
          <Sep text='|' />
          
          <span>
            Logged in as <Link to={`/users/${authData.data.username}`}>{authData.data.username}</Link>
          </span>
          <Sep text=' ' />
          
          <button type="button" onClick={this.handleLogout}>Log Out</button>
        </nav>
        <hr />
      </header>
    );
  }
}


Header.propTypes = {
  history: PropTypes.object,
  authData: PropTypes.object,
  userLogout: PropTypes.func
};



export default withRouter( connect(null, { userLogout })(Header) );
