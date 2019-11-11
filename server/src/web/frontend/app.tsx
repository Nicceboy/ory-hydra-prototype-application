import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Registration from './Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Registration} />
      </Router>
    </div>
  );
};
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
ReactDOM.render(<App />, document.getElementById('root'));
