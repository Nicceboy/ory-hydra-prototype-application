import React, { useState, useEffect } from 'react';
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
function TokenPage(props: Props) {
  const [openid, setOpenid] = useState(0);
  const [data, setData] = useState({});
  const [url, SetUrl] = useState(location.href);

  useEffect(() => {
    const body = {
      url: url
    };
    console.log(props);
    debugger;
    const fetchData = async () => {
      const result = await fetch('/callback');

      setData(result.data);
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
