import React, { useState, useEffect } from 'react';
import QRCodeReact, { QRCode } from 'qrcode.react';
import { Jumbotron, Button } from 'reactstrap';
import speakeasy from 'speakeasy';

const fetch = require('node-fetch');
type QRCodeProps = {
  email: string;
  url: string;
};
function QRCode(props: QRCodeProps) {
  const [qrcode, setQrcode] = useState('');
  const [token, setToken] = useState('');
  const [secret, setSecret] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      fetch('/mfa/activate', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res: any) => res.json()) // expecting a json response
        .then((json: any) => {
          setQrcode(json.qrcode);
          setSecret(json.secret);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <form>
        <label>Token:</label>
        <input
          type="text"
          placeholder="Insert Token"
          onChange={e => setToken(e.target.value)}
        />
        <Button
          color="primary"
          onClick={() => {
            var verified = speakeasy.totp.verify({
              secret: secret,
              encoding: 'hex',
              token: token
            });
            if (verified) {
              const email = props.email;
              fetch('http://127.0.0.1:3002/user-management/user/' + email, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  two_factorization_secret: secret
                })
              })
                .then((res: any) => res.json()) // expecting a json response
                .then((json: any) => {
                  console.log(json);
                });
            }
          }}
        >
          Submit
        </Button>
      </form>
      <img src={qrcode} />
    </div>
  );
}

export default QRCode;
