import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Welcome from './WelcomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/callback" component={Welcome} />
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
