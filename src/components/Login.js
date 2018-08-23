import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userLogin } from '../actions/authAction';
import { ValidateEmail, ErrorMessage, Sep } from '../utils';


const mapStateToProps = state => ({
  authData: state.authData
});


class Login extends React.Component {
  state = {
    loginData: { 
      email: 'test.user01@example.com', 
      password: '12345678'
    },
    errors: {}
  };

  handleChange = (e) => {
    this.setState({ 
      loginData: {...this.state.loginData, [e.target.name]: e.target.value} 
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { loginData } = this.state;
    const { history, userLogin } = this.props;

    const errors = this.formValidation(loginData);

    // check whether input errors exist or not
    if (Object.keys(errors).length === 0) {

      userLogin(loginData).then(result => {

        if (result.type === 'USER_LOGIN_SUCCESS') {
          history.push('/home');
          
        } else {
          this.setState({
              errors: { failure: result.message }
          });
        }
      });

    } else {
      this.setState({ errors: errors });
    }

  };

  formValidation = data => {
    const errors = {};

    // check for email if it is empty or valid
    if (data.email === "" || !ValidateEmail(data.email)) errors.email = 'Invalid email';

    // check for password
    if (data.password === "") errors.password = 'Invalid password';

    return errors;
  };

  render() {
    const { loginData, errors } = this.state;
    const { authData } = this.props;
    
    return (
      <div>
        <h1>Log In</h1>

        <section>
          { !!errors.failure && <ErrorMessage text={errors.failure} /> }

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email:</label><br />
            <input type="text" name="email" value={loginData.email} onChange={this.handleChange} /><br />
            { !!errors.email && <ErrorMessage text={errors.email} /> }

            <label htmlFor="password">Password:</label><br />
            <input type="password" name="password" value={loginData.password} onChange={this.handleChange} /><br />     
            { !!errors.password && <ErrorMessage text={errors.password} /> }
            
            <button type="submit">{authData.isRequesting ? 'Logging In...' : 'Log In'}</button>
          </form>

          <br />
          <div>
            <Sep text='or' />
            <Link to='/accounts/signup'>create an account</Link>
          </div>
          
        </section>

      </div>
    );
  }
}

export default connect(mapStateToProps, { userLogin })(Login);