import React from 'react';
import Styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Requests from './components/Requests';
import Dashboard from './components/Dashboard';

import { Button, Container, Menu } from 'semantic-ui-react';

import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    user: auth.user
  };
}

const ButtonDark = Styled(Button)({
  backgroundColor: '#3d3d3d !important',
  color: '#ddd !important',
  '&:hover': {
    backgroundColor: '#4d4d4d !important'
  }
});

const App = ({ authenticated, user }) => {
  return (
    <Router>
      <Menu style={{ backgroundColor: '#1d1d1d' }}>
        <Container>
          <Menu.Item>
            <Link to="/" style={{ color: '#ddd' }}>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/requests" style={{ color: '#ddd' }}>Requests</Link>
          </Menu.Item>

          {/* Dashboard link can only be seen by admins */}
          { (user && user.level === 'admin') ?
          <Menu.Item>
            <Link to="/dashboard" style={{ color: '#ddd' }}>Dashboard</Link>
          </Menu.Item> : ''}

          {/* Conditionally render the login/logout buttons depending on login status */}
          <Menu.Item position='right'>
            { authenticated ? <ButtonDark href="http://localhost:5000/auth/logout">Logout</ButtonDark> : <ButtonDark href="http://localhost:5000/auth/login">Login</ButtonDark> }
          </Menu.Item>
        </Container>
      </Menu>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/requests" component={Requests}></Route>
        <PrivateRoute path="/dashboard" component={Dashboard} user={user}></PrivateRoute>
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, user, ...props }) => (
  <Route {...props} render={(props) => (
    (user && user.level === 'admin') ? <Component {...props} /> : <Redirect to="/" />
  )} />
)

export default connect(mapStateToProps)(App);
