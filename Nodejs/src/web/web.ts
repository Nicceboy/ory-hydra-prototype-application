import express from 'express';
import http from 'http';
import path from 'path';
const fetch = require('node-fetch');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const uuid = require('node-uuid');
const oauth2 = require('simple-oauth2');
var csrf = require('csurf');

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const expressSession = require('express-session');
const bodyParser = require('body-parser');

// Express app initialization
const app = express();

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5555');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(cookieParser());

const session = {
  secret: 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
  cookie: {},
  resave: false,
  saveUninitialized: false
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
  admin: process.env.ADMIN_URL || 'http://127.0.0.1:4445',
  port: 3000
};

// Template configuration

app.set('view engine', 'ejs');
app.set('views', 'public');

// Static files configuration
app.use('/assets', express.static(path.join(__dirname, 'frontend')));

// Controllers

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

app.get('/callback', async (req: any, res: any) => {
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

//probely used for auto login
app.put('/oauth2/auth/requests/login/accept', (request: any, res) => {
  const challenge = request.body.loginChallenge;
  const url = new URL('/oauth2/auth/requests/login', 'http://localhost:4445');
  url.search = querystring.stringify({
    ['login' + '_challenge']: challenge
  });

  fetch(url.toString())
    .then(function(res: any) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(function(body: any) {
          console.error(
            'An error occurred while making a HTTP request: ',
            body
          );
          return Promise.reject(new Error(body.error.message));
        });
      }

      return res.json();
    })
    .then(function(response: any) {
      // need to check if the atual user exsist in our database TODO
      // This will be called if the HTTP request was successful
      // If hydra was already able to authenticate the user, skip will be true and we do not need to re-authenticate
      // the user.
      fetch('http://localhost:3002/user-management/user-login', {
        method: 'POST',
        body: JSON.stringify({
          email: request.body.subject,
          password: request.body.password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((r: any) => r.json())
        .then((login: any) => {
          console.log(login);
          if (login.error_value != 0) {
            console.log('jeeee');
            res.send(login.message);
          } else {
            console.log(login);
            console.log(response);
            if (!response.skip) {
              // You can apply logic here, for example update the number of times the user logged in.
              // ...

              // Now it's time to grant the login request. You could also deny the request if something went terribly wrong
              // (e.g. your arch-enemy logging in...)
              const url = new URL(
                '/oauth2/auth/requests/login/accept',
                'http://localhost:4445'
              );
              url.search = querystring.stringify({
                ['login' + '_challenge']: challenge
              });
              return fetch(url.toString(), {
                method: 'PUT',
                body: JSON.stringify({ subject: request.body.subject }),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then((r: any) => r.json())
                .then((body: any) => {
                  console.log(body);
                  res.send(body);
                });
            }
          }
        });
    });
});

app.put('/oauth2/auth/requests/consent/skip', (request, res) => {
  const challenge = request.body.consentChallenge;
  const url = new URL('/oauth2/auth/requests/consent', 'http://localhost:4445');
  url.search = querystring.stringify({
    ['consent' + '_challenge']: challenge
  });

  fetch(url.toString())
    .then(function(res: any) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(function(body: any) {
          console.error(
            'An error occurred while making a HTTP request: ',
            body
          );
          return Promise.reject(new Error(body.error.message));
        });
      }

      return res.json();
    })
    .then(function(response: any) {
      // need to check if the atual user exsist in our database TODO
      // This will be called if the HTTP request was successful
      // If hydra was already able to authenticate the user, skip will be true and we do not need to re-authenticate
      // the user.
      // You can apply logic here, for example update the number of times the user logged in.
      // ...
      // Now it's time to grant the login request. You could also deny the request if something went terribly wrong
      // (e.g. your arch-enemy logging in...)
      console.log(response.skip);
      console.log('conset');
      res.send(response.skip);
    });
});

app.put('/oauth2/auth/requests/consent/accept', (request, res) => {
  const challenge = request.body.consentChallenge;
  const url = new URL('/oauth2/auth/requests/consent', 'http://localhost:4445');
  url.search = querystring.stringify({
    ['consent' + '_challenge']: challenge
  });

  fetch(url.toString())
    .then(function(res: any) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(function(body: any) {
          console.error(
            'An error occurred while making a HTTP request: ',
            body
          );
          return Promise.reject(new Error(body.error.message));
        });
      }

      return res.json();
    })
    .then(function(response: any) {
      console.log(response);
      // need to check if the atual user exsist in our database TODO
      // This will be called if the HTTP request was successful
      // If hydra was already able to authenticate the user, skip will be true and we do not need to re-authenticate
      // the user.
      // You can apply logic here, for example update the number of times the user logged in.
      // ...

      // Now it's time to grant the login request. You could also deny the request if something went terribly wrong
      // (e.g. your arch-enemy logging in...)
      const url = new URL(
        '/oauth2/auth/requests/consent/accept',
        'http://localhost:4445'
      );
      url.search = querystring.stringify({
        ['consent' + '_challenge']: challenge
      });
      return fetch(url.toString(), {
        method: 'PUT',
        body: JSON.stringify({
          // We can grant all scopes that have been requested - hydra already checked for us that no additional scopes
          // are requested accidentally.
          grant_scope: ['offline', 'openid'],

          // The session allows us to set session data for id and access tokens
          session: {
            // This data will be available when introspecting the token. Try to avoid sensitive information here,
            // unless you limit who can introspect tokens.
            // access_token: { foo: 'bar' },
            // This data will be available in the ID token.
            // id_token: { baz: 'bar' },
          },

          // ORY Hydra checks if requested audiences are allowed by the client, so we can simply echo this.
          grant_access_token_audience: response.audience,

          // This tells hydra to remember this consent request and allow the same client to request the same
          // scopes from the same user, without showing the UI, in the future.
          remember: true,

          // When this "remember" sesion expires, in seconds. Set this to 0 so it will never expire.
          remember_for: 3600
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((r: any) => r.json())
        .then((body: any) => {
          res.send(body);
        });
    });
});

app.get('/*', (req: any, res: any) => {
  res.render('index');
});
// Start function
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, '127.0.0.1');
  });
};
