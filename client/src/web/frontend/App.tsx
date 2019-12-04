import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Welcome from './WelcomePage';
import './App.css';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import TokenPage from './TokenPage';
function App(props: any) {
  console.log(props);
  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Welcome} />

        <Route exact path="/callback" component={TokenPage} />
      </Router>
    </div>
  );
}


export default App;
