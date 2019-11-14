import express from 'express';
import http from 'http';
import path from 'path';
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
const uuid = require('node-uuid');
const oauth2 = require('simple-oauth2');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

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
  const credentials = {
    client: {
      id: 'auth-code-client',
      secret: 'secret'
    },
    auth: {
      tokenHost: config.public,
      authorizeHost: config.url,
      tokenPath: '/oauth2/token',
      authorizePath: '/oauth2/auth'
    }
  };

  const state = uuid.v4();
  const scope = req.query.scope || '';

  req.session.credentials = credentials;
  req.session.state = state;
  req.session.scope = scope.split(' ');

  const url = oauth2.create(credentials).authorizationCode.authorizeURL({
    redirect_uri: `http://localhost:5555/callback`,
    scope,
    state
  });

  res.send(JSON.stringify(url));
});

app.get('/token/callback', async (req: any, res: any) => {
  if (req.query.error) {
    res.send(JSON.stringify(Object.assign({ result: 'error' }, req.query)));
    return;
  }

  if (req.query.state !== req.session.state) {
    res.send(JSON.stringify({ result: 'error', error: 'states mismatch' }));
    return;
  }

  if (!req.query.code) {
    res.send(JSON.stringify({ result: 'error', error: 'no code given' }));
    return;
  }

  oauth2
    .create(req.session.credentials)
    .authorizationCode.getToken({
      redirect_uri: `http://localhost:5555/callback`,
      scope: req.session.scope,
      code: req.query.code
    })
    .then((token: any) => {
      req.session.oauth2_flow = { token }; // code returns {access_token} because why not...
      res.send({ result: 'success', token });
    })
    .catch((err: any) => {
      if (err.data.payload) {
        res.send(JSON.stringify(err.data.payload));
        return;
      }
      res.send(JSON.stringify({ error: err.toString() }));
    });
});

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
