import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
const fetch = require('node-fetch');
const Example = () => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple Jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-2" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className="lead">
          <Button
            color="primary"
            onClick={() => {
              window.location.href = 'http://127.0.0.1:3000/auth/provider';
              //   fetch('/auth/provider')
              //     .then(res => res.json())
              //     .then(json => console.log(json));
            }}
          >
            Login
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Example;
