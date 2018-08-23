import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userSignup } from '../actions/authAction';
import { ValidateEmail, ErrorMessage } from '../utils';


const mapStateToProps = state => ({
  authData: state.authData
});


class Signup extends React.Component {

  state = {
    singupData: { 
      email: '', 
      password: '', 
      username: '', 
      firstname: '', 
      lastname: '' 
    },
    errors: {}
  };

  handleChange = (e) => {
    this.setState({
      singupData: {...this.state.singupData, [e.target.name]: e.target.value}
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { singupData } = this.state;
    const { history, userSignup } = this.props;

    const errors = this.formValidation(singupData);

    // check whether input errors exist or not
    if (Object.keys(errors).length === 0) {

      userSignup(singupData).then(result => {

          if (result.type === 'USER_SIGNUP_SUCCESS') {
            history.push('/home');
            
          } else {
            result.payload.json().then(err => {
              this.setState({
                errors: { failure: err.message }
              });
            });
          }

        });

    } else {
      this.setState({ errors: errors });
    }
    
  };


  // form validation for user inputs
  formValidation = data => {
    const errors = {};

    // check for email if it is empty or valid
    if (data.email === "" || !ValidateEmail(data.email)) errors.email = 'Invalid email';
    if (data.password === "") errors.password = 'Invalid password';
    if (data.username === "") errors.username = 'Invalid username';
    if (data.firstname === "") errors.firstname = 'Invalid first name';
    if (data.lastname === "") errors.lastname = 'Invalid last name';

    return errors;
  };

  render() {

    const { singupData, errors } = this.state;
    const { authData } = this.props;

    return (
      <div>
        <h1>Sign Up</h1>
        
        <section>
          <form onSubmit={this.handleSubmit}>
            
            <label htmlFor="email">Email:</label><br />
            <input type="text" name="email" value={singupData.email} onChange={this.handleChange} /><br />
            {!!errors.email && <ErrorMessage text={errors.email} />}

          
            <label htmlFor="password">Password:</label><br />
            <input type="password" name="password" value={singupData.password} onChange={this.handleChange} /><br />
            {!!errors.password && <ErrorMessage text={errors.password} />}

          
            <label htmlFor="username">Username:</label><br />
            <input type="text" name="username"  value={singupData.username} onChange={this.handleChange} /><br />
            {!!errors.username && <ErrorMessage text={errors.username} />}

          
            <label htmlFor="firstname">First Name:</label><br />
            <input type="text" name="firstname" value={singupData.firstname} onChange={this.handleChange} /><br />
            {!!errors.firstname && <ErrorMessage text={errors.firstname} />}

          
            <label htmlFor="lastname">Last Name:</label><br />
            <input type="text" name="lastname" value={singupData.lastname} onChange={this.handleChange} /><br />
            {!!errors.lastname && <ErrorMessage text={errors.lastname} />}          


            <button type="submit">
              {authData.isRequesting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <br />
          <div>or <Link to='/accounts/login'>log in to your account</Link></div>
        </section>

      </div>
    );
  }
}

export default connect(mapStateToProps, { userSignup })(Signup);