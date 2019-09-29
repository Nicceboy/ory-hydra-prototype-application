var OryHydra = require('@oryd/hydra');
const fetch = require('node-fetch');
var qs = require('qs');
var querystring = require('querystring');

// Set this to Hydra's URL
OryHydra.ApiClient.instance.basePath = 'http://localhost:4445';

var apiInstance = new OryHydra.AdminApi();

// var id = 'my-client'; // String | The id of the OAuth 2.0 Client.

// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully. Returned data: ' + data);
//   }
// };
// apiInstance.getOAuth2Client(id, callback);
//Set the configuration settings

// index.js

const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = '3004';

const session = {
  secret: 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
  cookie: {},
  resave: false,
  saveUninitialized: false
};
// Sets up csrf protection
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var callbackAccept = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
var callbackLoginRequest = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    var opts = {
      subject: new OryHydra.AcceptLoginRequest() // AcceptLoginRequest |
    };
    opts.subject = 'asdas';
    apiInstance.acceptLoginRequest(data.challenge, opts, callbackAccept);
    console.log('API called successfully. Returned data: ' + data);
  }
};

app.use(expressSession(session));

passport.use(
  'provider',
  new OAuth2Strategy(
    {
      authorizationURL: 'http://localhost:4444/oauth2/auth',
      tokenURL: 'http://localhost:4444/oauth2/token',
      clientID: 'auth-code-client',
      clientSecret:
        '$2a$10$k96GKJLYspXG4XVp6asr3OLzZUykf.CB.MBKEH9SVUx0H29/OlkBK',
      callbackURL: 'http://127.0.0.1:5555/callback',
      state: 'fhutgedvhvxgwdmdmqjfnvnh'
    },
    function(accessToken, refreshToken, profile, done) {
      debugger;
      User.findOrCreate(null, function(err, user) {
        done(err, user);
      });
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

//probely used for auto login
app.put('/oauth2/auth/requests/login/accept', (request, res) => {
  console.log(request.body.loginChallenge);
  const challenge = request.body.loginChallenge;
  const url = new URL('/oauth2/auth/requests/login', 'http://localhost:4445');
  url.search = querystring.stringify({
    ['login' + '_challenge']: challenge
  });

  fetch(url.toString())
    .then(function(res) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(function(body) {
          console.error(
            'An error occurred while making a HTTP request: ',
            body
          );
          return Promise.reject(new Error(body.error.message));
        });
      }

      return res.json();
    })
    .then(function(response) {
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
          .then(r => r.json())
          .then(body => {
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

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
