import express from 'express';
import http from 'http';
import path from 'path';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
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
  admin: process.env.ADMIN_URL || 'http://127.0.0.1:4445',
  port: 3000
};

// Template configuration

app.set('view engine', 'ejs');
app.set('views', 'public');

// Static files configuration
app.use('/assets', express.static(path.join(__dirname, 'frontend')));

// Controllers

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
//----------------------------Two Factorization--------------------------

app.get('/mfa/activate', async function(req: any, res: any) {
  if (true) {
    var secret = speakeasy.generateSecret({ name: 'Aerial Reward Demo' });
    req.session.mfasecret_temp = secret.base32;
    if (secret.otpauth_url != null) {
      qrcode.toDataURL(secret.otpauth_url, function(err: any, data_url: any) {
        if (err) {
          res.render('profile', {
            uname: req.session.username,
            mfa: req.session.mfa,
            qrcode: '',
            msg: 'Could not get MFA QR code.',
            showqr: true
          });
        } else {
          console.log(data_url);
          // Display this data URL to the user in an <img> tag
          res.render('profile', {
            uname: req.session.username,
            mfa: req.session.mfa,
            qrcode: data_url,
            msg: 'Please scan with your authenticator app',
            showqr: true
          });
        }
      });
    } else {
      console.log('QR code URL is null');
    }
  } else {
    res.redirect('/login');
  }
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
