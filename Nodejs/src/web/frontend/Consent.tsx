import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col
} from 'reactstrap';

const fetch = require('node-fetch');
type Props = {
  location: object;
  match: string;
};
function Consent(props: Props) {
  const [openid, setOpenid] = useState(0);
  const [offline, setOffline] = useState(0);
  const [consentChallenge, SetconsentChallenge] = useState(
    location.search.split('=')[1]
  );
  return (
    <div>
      <Form>
        <Label>ahsdahsdahsd we are using your informations</Label>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={e => setOffline(e.target.valueAsNumber)}
            />{' '}
            offline
          </Label>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={e => setOpenid(e.target.valueAsNumber)}
            />{' '}
            openid
          </Label>
        </FormGroup>
        <Button
          onClick={() => {
            const body = {
              consentChallenge: consentChallenge
            };
            fetch('/oauth2/auth/requests/consent/accept', {
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

export default Consent;
