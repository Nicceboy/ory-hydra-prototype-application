import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const fetch = require('node-fetch');
type Props = {
  location: object;
  match: string;
};
function Login(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginChallenge, setLoginChallenge] = useState(
    location.search.split('=')[1]
  );
  console.log(email);
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="with a placeholder"
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="password placeholder"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          onClick={() => {
            const body = {
              loginChallenge: loginChallenge,
              subject: email,
              password: password
            };
            fetch('/oauth2/auth/requests/login/accept', {
              method: 'PUT',
              body: JSON.stringify(body),
              headers: { 'Content-Type': 'application/json' }
            })
              .then((res: any) => res.json()) // expecting a json response
              .then((json: any) => {
                window.location.href = json.redirect_to;
              });
            console.log('login');
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
