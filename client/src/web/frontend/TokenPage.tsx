import React, { useState, useEffect } from "react";
import {
  Divider,
  Form,
  Label,
  Button,
  Radio,
  Checkbox,
  Tab,
  Card,
  Image
} from "semantic-ui-react";
import Cookies from "js-cookie";
import * as H from "history";
import { create } from "istanbul-reports";

const fetch = require("node-fetch");
type Props = {
  location: H.Location;
};

function CreateCards() {
  let cards = [];
  for (let i = 0; i < 5; i++) {
    cards.push(
      <Card>
        <Image src="/undefined.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra></Card.Content>
      </Card>
    );
  }
  return cards;
}
function TokenPage(props: Props) {
  const [openid, setOpenid] = useState(0);
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [gname, setGName] = useState("");
  const [fname, setFName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [twofactor, setTwoFactor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/token/callback" + props.location.search);
      let data = await result.json();
      console.log(data);
      let date = new Date("1970-01-01T00:00:00");
      //adding seccond to '1970-01-01T00:00:00', and 2 hours for some reason the expire time is missing 2 hour
      date = new Date(
        date.getTime() + 1000 * data.token.expires_at + 2 * 3600 * 1000
      );
      Cookies.set("token", data.token.access_token, { expires: 3 / 24 });
      setData(data.token.access_token);
      if (data.token.access_token != undefined) {
        const result1 = await fetch(
          `http://127.0.0.1:3002/user-management/user/${data.token.access_token}?data=phone_number&data=email&data=name&data=family_name&data=preferred_username&data=two_factor`
        );
        let data1 = await result1.json();
        console.log(data1);
        let dataReturn = data1.return_value;

        if (data1.error_value === 0) {
          setEmail(dataReturn.email);
          setFName(dataReturn.family_name);
          setGName(dataReturn.name);
          setUsername(dataReturn.preferred_username);
          setPhone(dataReturn.phone_number);
          setTwoFactor(dataReturn.two_factor);
          console.log(dataReturn.email);
          console.log(dataReturn.two_factor);
        }
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let token: String = data as String;
  //     console.log(token);
  //     if (token != undefined) {
  //       const result = await fetch(
  //         `http://127.0.0.1:3002/user-management/user/${token}?data=phone_number&data=email&data=name&data=family_name&data=preferred_username&data=two_factor`
  //       );
  //       let data = await result.json();
  //       console.log(data);
  //       let dataReturn = data.return_value;

  //       if (data.error_value === 0) {
  //         setEmail(dataReturn.email);
  //         setFName(dataReturn.family_name);
  //         setGName(dataReturn.name);
  //         setUsername(dataReturn.preferred_username);
  //         setPhone(dataReturn.phone_number);
  //         setTwoFactor(dataReturn.two_factor);
  //         console.log(dataReturn.email);
  //         console.log(dataReturn.two_factor);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  const panes = [
    {
      menuItem: "User Information",
      render: () => (
        <Tab.Pane attached={false}>
          <Form>
            <Form.Field>
              <Label>Name</Label>
              <input
                name="name"
                type="text"
                // placeholder={gname}
                // disabled={true}
                defaultValue={gname}
              />
            </Form.Field>
            <Divider />

            <Form.Field>
              <Label>Family Name</Label>
              <input
                name="family_name"
                type="text"
                // placeholder={fname}
                // disabled={true}
                defaultValue={fname}
              />
            </Form.Field>
            <Divider />
            <Form.Field>
              <Label>Phone number</Label>
              <input
                name="phone_number"
                type="text"
                // placeholder={phone}
                // disabled={true}
                defaultValue={phone}
              />
            </Form.Field>
            <Divider />
            <Form.Field>
              <Label>Email</Label>
              <input
                name="email"
                type="text"
                // placeholder={email}
                // disabled={true}
                defaultValue={email}
              />
            </Form.Field>
            <Divider />

            <Form.Field>
              <Label>Username</Label>
              <input
                name="preferred_username"
                type="text"
                // placeholder={username}
                // disabled={true}
                defaultValue={username}
              />
            </Form.Field>
            <Divider />
            <Form.Field>
              <Checkbox
                toggle
                label="TwoFactor"
                checked={twofactor}
                disabled={true}
              />
            </Form.Field>
          </Form>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Groups",
      render: () => <Tab.Pane attached={false}>{CreateCards()}</Tab.Pane>
    }
  ];

  return (
    <div>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
  );
}

export default TokenPage;
