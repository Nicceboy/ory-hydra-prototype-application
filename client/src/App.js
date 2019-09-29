import React from 'react';
import logo from './logo.svg';
import Login from './Login';
import Welcome from './WelcomePage';
import './App.css';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
function App(props) {
  console.log(props);
  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Welcome} />
      </Router>
    </div>
  );
}

export default App;
