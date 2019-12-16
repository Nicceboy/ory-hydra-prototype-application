import React, { useState, useEffect } from "react";
import QRCodeReact, { QRCode } from "qrcode.react";
import { Jumbotron, Button } from "reactstrap";
import speakeasy from "speakeasy";
import { url } from "inspector";

const fetch = require("node-fetch");
type QRCodeProps = {
  email: string;
  url: string;
  secretProps: string;
};
function QRCode(props: QRCodeProps) {
  const [qrcode, setQrcode] = useState("");
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");

  useEffect(() => {
    const fetchData = () => {
      fetch("/mfa/activate", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
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
            console.log(props.secretProps);
            console.log(secret);
            var verified = speakeasy.totp.verify({
              secret: props.secretProps === "" ? secret : props.secretProps,
              encoding: "hex",
              token: token
            });
            console.log(verified);
            console.log(props.secretProps);
            if (verified) {
              if (props.secretProps === "") {
                console.log("put");
                const email = props.email;
                fetch("http://127.0.0.1:3002/user-management/user/" + email, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    two_factorization_secret:
                      props.secretProps === "" ? secret : props.secretProps
                  })
                })
                  .then((res: any) => res.json()) // expecting a json response
                  .then((json: any) => {
                    console.log(json);
                    if (json.error_value == 0) {
                      window.location.href = props.url;
                    }
                  });
              } else {
                window.location.href = props.url;
              }
            }
          }}
        >
          Submit
        </Button>
      </form>

      {props.secretProps == "" ? <img src={qrcode} /> : undefined}
    </div>
  );
}

export default QRCode;
