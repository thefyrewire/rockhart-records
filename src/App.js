import React from 'react';
import Styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Requests from './components/Requests';
import Dashboard from './components/Dashboard';

import { Button, Container, Menu } from 'semantic-ui-react';

const LoginButton = Styled(Button)({
  backgroundColor: '#3d3d3d !important',
  color: '#ddd !important',
  '&:hover': {
    backgroundColor: '#4d4d4d !important'
  }
});

const App = () => {
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
          <Menu.Item>
            <Link to="/dashboard" style={{ color: '#ddd' }}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item position='right'>
            <LoginButton href="http://localhost:5000/auth">Login</LoginButton>
          </Menu.Item>
        </Container>
      </Menu>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/requests" component={Requests}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
