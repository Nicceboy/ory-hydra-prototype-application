import React, { useState } from 'react';
import { Divider, Form, Label, Button } from 'semantic-ui-react'

const fetch = require('node-fetch');


function Registration() {
  const [name, setName] = useState('');
  const [familyname, setFamilyname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  return (
    <Form>
      <Form.Field>
        <input type='text' placeholder='First name' onChange={e => setName(e.target.value)} />
        {/* <Label disabled={true} basic color='red' pointing>
          Please enter a value
        </Label> */}
      </Form.Field>
      <Divider />

      <Form.Field>
        {/* <Label basic color='red' pointing='below'>
          Please enter a value
        </Label> */}
        <input type='text' placeholder='Last Name' onChange={e => setFamilyname(e.target.value)} />
      </Form.Field>
      <Divider />
      <Form.Field >
        {/* <Label basic color='red' pointing='right'>
          Your password must be 6 characters or more
        </Label> */}
        <input type='text' name='phonenumber' id='registration_phonenumber' placeholder='Phonenumber' onChange={e => setPhonenumber(e.target.value)} />
      </Form.Field>
      <Divider />
      <Form.Field >
        <input type='email' name='email' id='registration_email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
        {/* <Label basic color='red' pointing='left'>
          That Email is taken!
        </Label> */}
      </Form.Field>
      <Divider />

      <Form.Field >
        {/* <Label basic color='red' pointing='right'>
          Your password must be 6 characters or more
        </Label> */}
        <input type='password' name='password' id='registration_password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
      </Form.Field>

      <Form.Field>
        <Button
          color='blue'
          onClick={() => {
            const body = {
              name: name,
              family_name: familyname,
              email: email,
              phone_number: phonenumber,
              password: password
            };
            fetch('/user-management/user', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: { 'Content-Type': 'application/json' }
            })
              .then((res: any) => res.json()) // expecting a json response
              .then((json: any) => {
                console.log(json);
              });
          }}
        >
          Register
        </Button>
      </Form.Field>
    </Form>
  );
}

export default Registration;
