import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { log } from 'util';
const fetch = require('node-fetch');
const Example = (props: any) => {
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
              fetch('/oauth2/code')
                .then((res: any) => res.json())
                .then((json: any) => {
                  console.log(json);
                  window.location.href = json;
                });
            }}
          >
            Login
          </Button>
          <Button
            color="primary"
            onClick={() => {
              window.location.href = 'http://127.0.0.1:3002';
            }}
          >
            Register
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Example;
