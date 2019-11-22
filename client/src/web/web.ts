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

const metaIssuser = {
  authorization_endpoint: 'http://127.0.0.1:4444/oauth2/auth',
  token_endpoint: 'http://127.0.0.1:4444/oauth2/token',
  issuer: 'http://127.0.0.1:4444/',
  jwks_uri: 'http://127.0.0.1:4444/.well-known/jwks.json'
};

const issuer = new Issuer(metaIssuser);
Issuer.discover('http://127.0.0.1:4444/.well-known/openid-configuration') // => Promise
  .then(function(googleIssuer: any) {
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
// app.get('/oauth2/code', (req: any, res: any) => {
//   const credentials = {
//     client: {
//       id: 'auth-code-client'
//     },
//     auth: {
//       tokenHost: config.public,
//       authorizeHost: config.url,
//       tokenPath: '/oauth2/token',
//       authorizePath: '/oauth2/auth'
//     }
//   };

//   const state = uuid.v4();
//   const scope = req.query.scope || '';
//   var code_verifier = '7073d688b6dcb02b9a2332e0792be265b9168fda7a6';
//   var hash = crypto
//     .createHash('sha256')
//     .update(code_verifier)
//     .digest();
//   var code_challenge = base64url.encode(hash);
//   req.session.credentials = credentials;
//   req.session.state = state;
//   req.session.scope = scope.split(' ');
//   req.session.code_challenge = code_challenge;
//   req.session.code_verifier = code_verifier;
//   const url = oauth2.create(credentials).authorizationCode.authorizeURL({
//     redirect_uri: `http://localhost:5555/callback`,
//     scope,
//     state,

//     code_challenge,
//     code_challenge_method: 'S256'
//   });

//   res.send(JSON.stringify(url));
// });

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
      .then(function(token: any) {
        res.send({ result: 'success', token });
      });
  } catch (e) {
    console.log(e);
  }
});
// app.get('/token/callback', async (req: any, res: any) => {
//   if (req.query.error) {
//     res.send(JSON.stringify(Object.assign({ result: 'error' }, req.query)));
//     return;
//   }

//   if (req.query.state !== req.session.state) {
//     res.send(JSON.stringify({ result: 'error', error: 'states mismatch' }));
//     return;
//   }

//   if (!req.query.code) {
//     res.send(JSON.stringify({ result: 'error', error: 'no code given' }));
//     return;
//   }
//   let credentials = req.session.credentials;
//   const httpOptions = {
//     client_id: 'auth-code-client',
//     code_verifier: req.session.code_verifier
//   };
//   oauth2
//     .create(credentials)
//     .authorizationCode.getToken(
//       {
//         redirect_uri: `http://localhost:5555/callback`,
//         scope: req.session.scope,
//         code: req.query.code,
//         client_id: 'auth-code-client',
//         code_verifier: req.session.code_verifier
//       },
//       httpOptions
//     )
//     .then((token: any) => {
//       req.session.oauth2_flow = { token }; // code returns {access_token} because why not...
//       res.send({ result: 'success', token });
//     })
//     .catch((err: any) => {
//       if (err.data.payload) {
//         res.send(JSON.stringify(err.data.payload));
//         return;
//       }
//       res.send(JSON.stringify({ error: err.toString() }));
//     });
// });
app.get('/*', (req: any, res: any) => {
  console.log('fuck');
  res.render('index');
});
// Start function
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, 'localhost');
  });
};
