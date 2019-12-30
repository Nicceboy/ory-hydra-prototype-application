import express from 'express';
import http from 'http';
import path from 'path';
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
const uuid = require('node-uuid');
const oauth2 = require('simple-oauth2');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const base64url = require('base64url');
const { generators } = require('openid-client');
const { Issuer } = require('openid-client');
import { CRUD_Result } from './helpers/helper';
import * as groupCrud from './GroupCRUD';
import { ReturnErrors } from './helpers/helper';
import { GroupInfo_Result } from './helpers/helper';
import * as db from './database';

var connector = db.run();

const metaIssuser = {
  authorization_endpoint: 'http://127.0.0.1:4444/oauth2/auth',
  token_endpoint: 'http://127.0.0.1:4444/oauth2/token',
  issuer: 'http://127.0.0.1:4444/',
  jwks_uri: 'http://127.0.0.1:4444/.well-known/jwks.json'
};

const issuer = new Issuer(metaIssuser);
Issuer.discover('http://127.0.0.1:4444/.well-known/openid-configuration') // => Promise
  .then(function (googleIssuer: any) {
    console.log(
      'Discovered issuer %s %O',
      googleIssuer.issuer,
      googleIssuer.metadata
    );
  });
const metaClient = {};
const client = new issuer.Client({
  client_id: 'auth-code-client',
  response_types: ['code'],
  token_endpoint_auth_method: 'none'
  // id_token_signed_response_alg (default "RS256")
  // token_endpoint_auth_method (default "client_secret_basic")
});
client.grant('authorization_code, refresh_token');
// Express app initialization
const app = express();

app.use(cookieParser());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  next();
});
const session = {
  secret: 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  isauth: true
};
//set up session
app.use(expressSession(session));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

const config = {
  url: process.env.AUTHORIZATION_SERVER_URL || 'http://127.0.0.1:4444/',
  public: process.env.PUBLIC_URL || 'http://127.0.0.1:4444/',
  admin: process.env.ADMIN_URL || 'http://127.0.0.1:4445'
};

// // Template configuration
app.set('view engine', 'ejs');
app.set('views', 'public');

// Static files configuration
app.use('/assets', express.static(path.join(__dirname, 'frontend')));

app.get('/oauth2/code', (req: any, res: any) => {
  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);
  const state = uuid.v4();
  const url = client.authorizationUrl({
    scope: 'openid offline',
    code_challenge,
    code_challenge_method: 'S256',
    state: state
  });
  req.session.state = state;
  req.session.scope = 'openid offline';
  req.session.code_verifier = code_verifier;
  req.session.client = client;
  res.send(JSON.stringify(url));
});

app.get('/token/callback', async (req: any, res: any) => {
  console.log(issuer);
  const params = client.callbackParams(req.url);
  const code_verifier = req.session.code_verifier;
  try {
    const a = await client
      .callback('http://localhost:5555/callback', params, {
        code_verifier,
        state: req.session.state
      }) // => Promise
      .then(function (token: any) {
        res.send({ result: 'success', token });
      });
  } catch (e) {
    console.log(e);
  }
});

//-----------------------Group Management-------------------------------
app.post('/group-management/CreateGroup/:token', async function (req, res) {
  console.log(req.params.token);
  const result: CRUD_Result = await groupCrud.CreateGroup(req.body, req.params.token);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadCredentials) {
    res.status(401).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});

app.post('/group-management/AddToGroup/:token', async function (req, res) {
  const result: CRUD_Result = await groupCrud.AddUserInGroup(req.body, req.params.token);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadCredentials) {
    res.status(401).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});

app.post('/group-management/JoinGroup/:token', async function (req, res) {
  const result: GroupInfo_Result = await groupCrud.JoinToGroup(req.body, req.params.token);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadCredentials) {
    res.status(401).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});

app.get('/group-management/GroupInfo/:groupID/:userID/:token', async function (req, res) {
  const result: GroupInfo_Result = await groupCrud.GetGroupInfo(req.params.groupID, req.params.userID, req.params.token);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadCredentials) {
    res.status(401).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});
//-----------------------------------------------------------------------


app.get('/*', (req: any, res: any) => {
  res.render('index');
});
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, 'localhost');
  });
};
