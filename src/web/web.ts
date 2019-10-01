import express from 'express';
import http from 'http';
import path from 'path';
const fetch = require('node-fetch');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const expressSession = require('express-session');
const bodyParser = require('body-parser');

// Express app initialization
const app = express();
app.use(cookieParser());
//Authorization

const session = {
  secret: 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
  cookie: {},
  resave: false,
  saveUninitialized: false
};
// Sets up csrf protection
//passport js requires
app.use(expressSession(session));

passport.use(
  'provider',
  new OAuth2Strategy(
    {
      authorizationURL: 'http://127.0.0.1:4444/oauth2/auth',
      tokenURL: 'http://127.0.0.1:4444/oauth2/token',
      clientID: 'auth-code-client',
      clientSecret:
        '$2a$10$k96GKJLYspXG4XVp6asr3OLzZUykf.CB.MBKEH9SVUx0H29/OlkBK',
      callbackURL: 'http://127.0.0.1:5555/callback',
      state: 'fhutgedvhvxgwdmdmqjfnvnh'
    },
    function(accessToken: any, refreshToken: any, profile: any, done: any) {
      return done;
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
var csrfProtection = csrf({ cookie: true });

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get(
  '/auth/provider/callback',
  passport.authenticate('provider', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
// Template configuration
app.set('view engine', 'ejs');
app.set('views', 'public');

// Static files configuration
app.use('/assets', express.static(path.join(__dirname, 'frontend')));

// Controllers
app.get('/*', (req: any, res: any) => {
  res.render('index');
});

//probely used for auto login
app.put('/oauth2/auth/requests/login/accept', (request, res) => {
  console.log(request.body.loginChallenge);
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
      console.log(response);
      // This will be called if the HTTP request was successful
      // If hydra was already able to authenticate the user, skip will be true and we do not need to re-authenticate
      // the user.
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
    });

  // apiInstance.getLoginRequest(
  //   request.body.loginChallenge,
  //   callbackLoginRequest
  // );
});

// Start function
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, '127.0.0.1');
  });
};
