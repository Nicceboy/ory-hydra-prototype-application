import React, { useState, useEffect } from 'react';
import * as H from 'history';
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
  location: H.Location;
};
function TokenPage(props: Props) {
  const [openid, setOpenid] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/callback' + props.location.search);
      let data = await result.json();
      console.log(data);
    };
    fetchData();
  });
  console.log(data);

  return (
    <div>
      <Form>
        <Button>Login</Button>
      </Form>
    </div>
  );
}

export default TokenPage;
