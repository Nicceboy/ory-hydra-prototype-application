import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Welcome from './WelcomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Welcome} />
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
