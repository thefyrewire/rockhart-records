import React, { useEffect } from 'react';
import Styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Home from './pages/Home';
import Requests from './pages/Requests';
import Dashboard from './pages/Dashboard';

import { Button, Container, Menu } from 'semantic-ui-react';

import { connect } from 'react-redux';
import io from 'socket.io-client';

import { getRecords, loadingRecords, loadedRecords } from './store/actions/records';
import { getRequests, addRequest, promoteRequest, deleteRequest, nextRequest, clearCurrentRequest } from './store/actions/requests';
import { getSettings, setChangeSetting } from './store/actions/settings';

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

const pageTransitions = {
  atEnter: {
    transitionIndex: 0,
    offset: 100,
    // scale: 0.5,
    opacity: 0
  },
  atActive: {
    transitionIndex: 1,
    offset: 0,
    // scale: 1,
    opacity: 1
  },
  atLeave: {
    transitionIndex: 2,
    offset: -100,
    // scale: 0.5,
    opacity: 0
  }
}

const App = ({ authenticated, user, getRecords, getRequests, addRequest, promoteRequest, deleteRequest, loadingRecords, loadedRecords, nextRequest, clearCurrentRequest, getSettings, setChangeSetting }) => {

  useEffect(() => {
    (async () => {
      loadingRecords();
      console.log('Fetching settings!');
      await getSettings();
      console.log('Fetching records!');
      await getRecords();
      loadedRecords();

      console.log('Fetching requests!');
      await getRequests();

      const socket = io('http://localhost:5000');
      socket.on('connected', () => console.log('Connected'));

      socket.on('new-request', (request) => addRequest(request));
      socket.on('promote-request', (id) => promoteRequest(id));
      socket.on('delete-request', (id) => deleteRequest(id));
      socket.on('next-request', ({ request }) => nextRequest(request));
      socket.on('clear-current-request', (request) => clearCurrentRequest(request));
      socket.on('update-settings', (settings) => setChangeSetting(settings));
    })();
  }, [getRecords, getRequests, addRequest, promoteRequest, deleteRequest, loadingRecords, loadedRecords, nextRequest, clearCurrentRequest, getSettings, setChangeSetting]);

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
      <AnimatedSwitch style={{ position: 'relative' }} {...pageTransitions} mapStyles={styles => ({
        // transform: `translateX(${styles.offset}%) scale(${styles.scale})`,
        transform: `translateX(${styles.offset}%)`,
        position: styles.transitionIndex <= 1 ? 'relative' : 'absolute',
        opacity: styles.opacity
      })}>
        <Route exact path="/" render={() => <Home/>}></Route>
        <Route exact path="/requests" render={() => <Requests/>}></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} user={user}></PrivateRoute>
      </AnimatedSwitch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, user, ...props }) => (
  <Route {...props} render={(props) => (
    (user && user.level === 'admin') ? <Component {...props} /> : <Redirect to="/" />
  )} />
)

export default connect(mapStateToProps, { getRecords, getRequests, addRequest, promoteRequest, deleteRequest, loadingRecords, loadedRecords, nextRequest, clearCurrentRequest, getSettings, setChangeSetting })(App);
