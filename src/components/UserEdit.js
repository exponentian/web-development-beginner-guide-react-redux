import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import PropTypes from 'prop-types';

import { userChangePassword } from '../actions/authAction';
import { userProfileUpdate } from '../actions/userAction';
import { ValidateEmail, ErrorMessage } from '../utils';


class UserEdit extends React.Component {
  state = {
    editData: {
      email: this.props.userData.data.email,
      username: this.props.userData.data.username,
      firstname: this.props.userData.data.firstname,
      lastname: this.props.userData.data.lastname
    },
    errors: {}
  };

  inputPassword = React.createRef();

  handleChange = (e) => {
    this.setState({
      editData: { ...this.state.editData, [e.target.name]: e.target.value.trim() }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { editData } = this.state;
    const { authData, userProfileUpdate } = this.props;
    const errors = this.formValidation(editData);

    if (Object.keys(errors).length === 0) {
      userProfileUpdate(authData.data, editData).then(userResult => {
        if (userResult.type === 'UPDATE_USER_INFO_SUCCESS') {
          alert("Successfully updated");
        }
      });
    }
  };

  formValidation = data => {
    const errors = {};

    if (data.email === "" || !ValidateEmail(data.email)) errors.email = 'Invalid email';
    if (data.username === "") errors.username = 'Invalid username';
    if (data.firstname === "") errors.firstname = 'Invalid firstname';
    if (data.lastname === "") errors.lastname = 'Invalid lastname';

    return errors;
  };

  changePassword = () => {
    const { authData, userChangePassword } = this.props;
    const newPassword = this.inputPassword.current.value.trim();

    if (newPassword !== '') {
      userChangePassword(authData.data, newPassword).then(userResult => {
        if (userResult.type === 'CHANGE_USER_PASSWORD_SUCCESS') {
          alert("Successfully changed");
        }
      });

    } else {
      this.setState({ 
        errors: { password: 'Invalid password' } 
      });
    }
  };

  render() {
    const { editData, errors } = this.state;
    const { history, authData, userData } = this.props;

    return (
      <div>
        <Header authData={authData} />

        <h3>User Edit</h3>
        
        <section>
          
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email:</label><br />
            <input type="text" name="email" defaultValue={editData.email} onChange={this.handleChange} /><br />
            {errors.email && <ErrorMessage text={errors.email} />}


            <label htmlFor="username">Username:</label><br />
            <input type="text" name="username"  defaultValue={editData.username} onChange={this.handleChange} /><br />
            {errors.username && <ErrorMessage text={errors.username} />}


            <label htmlFor="firstname">First Name:</label><br />
            <input type="text" name="firstname" defaultValue={editData.firstname} onChange={this.handleChange} /><br />
            {errors.firstname && <ErrorMessage text={errors.firstname} />}


            <label htmlFor="lastname">Last Name:</label><br />
            <input type="text" name="lastname" defaultValue={editData.lastname} onChange={this.handleChange} /><br />
            {errors.lastname && <ErrorMessage text={errors.lastname} />}
            

            <button type="submit">{userData.isRequesting ? 'Updating...' : 'Update'}</button>
            <button type="button" onClick={() => history.goBack()}>Cancel</button>
          </form>

        </section>

        <br />

        <section>
          <form>
            <label htmlFor="change-password">Change Password:</label><br />
            <input type="password" ref={this.inputPassword} /><br />
          
            <button type="button" onClick={this.changePassword}>
              {authData.isRequesting ? 'Changing...' : 'Change'}
            </button>

            { errors.password && <ErrorMessage text={errors.password} /> }  
          </form>
        </section>

      </div>
    );
  }
}


UserEdit.propTypes = {
  history: PropTypes.object,
  authData: PropTypes.object,
  userData: PropTypes.object
};



export default connect(null, {
  userProfileUpdate,
  userChangePassword
})(UserEdit);