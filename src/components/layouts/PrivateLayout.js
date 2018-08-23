import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../routes/PrivateRoute';
import NoMatch from '../routes/NoMatch';

import UserEdit from '../UserEdit';
import User from '../User';
import Home from '../Home';

class PrivateLayout extends React.Component {
  render() {
    return (
      <div className="content">
        <Switch>
          <PrivateRoute path='/users/:username/edit' loggedIn={true} component={props => <UserEdit {...this.props} />} />
          <PrivateRoute path='/users/:username' loggedIn={true} component={props => <User {...this.props} />} />
          <PrivateRoute path='/home' loggedIn={true} component={props => <Home {...this.props} />} />
          <Route component={props => <NoMatch to='/home' />} />
        </Switch>
      </div>
    );
  }
}

export default PrivateLayout;