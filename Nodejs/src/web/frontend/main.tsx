import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Welcome from './WelcomePage';
import Consent from './Consent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import TokenPage from './TokenPage';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/consent" component={Consent} />
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
