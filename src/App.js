import React, { useEffect } from 'react';
import Styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Requests from './pages/Requests';
import Dashboard from './pages/Dashboard';

import { Button, Container, Menu } from 'semantic-ui-react';

import { connect } from 'react-redux';
import io from 'socket.io-client';

import { getRecords } from './store/actions/records';
import { getRequests, addRequest, promoteRequest, deleteRequest } from './store/actions/requests';

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

const App = ({ authenticated, user, getRecords, getRequests, addRequest, promoteRequest, deleteRequest }) => {

  useEffect(() => {
    (async () => {
      console.log('Fetching records!');
      await getRecords();
      console.log('Fetching requests!');
      await getRequests();

      const socket = io('http://localhost:5000');

      socket.on('connected', () => {
        console.log('Connected');
      });

      socket.on('new-request', (request) => addRequest(request));
      socket.on('promote-request', (id) => promoteRequest(id));
      socket.on('delete-request', (id) => deleteRequest(id));
    })();
  }, [getRecords, getRequests, addRequest, promoteRequest, deleteRequest]);

  return (
    <Router>
      <Menu style={{ backgroundColor: '#1d1d1d', borderRadius: '0' }}>
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
        <Route exact path="/" render={() => <Home/>}></Route>
        <Route exact path="/requests" render={() => <Requests/>}></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} user={user}></PrivateRoute>
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, user, ...props }) => (
  <Route {...props} render={(props) => (
    (user && user.level === 'admin') ? <Component {...props} /> : <Redirect to="/" />
  )} />
)

export default connect(mapStateToProps, { getRecords, getRequests, addRequest, promoteRequest, deleteRequest })(App);
