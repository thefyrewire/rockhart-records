import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Requests from './components/Requests';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/requests" component={Requests}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
