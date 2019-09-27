// var OryHydra = require('@oryd/hydra');
// const fetch = require('node-fetch');

// Set this to Hydra's URL
// OryHydra.ApiClient.instance.basePath = 'http://localhost:4445';

// var apiInstance = new OryHydra.AdminApi();

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

const app = express();
const port = '3004';

const session = {
  secret: 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
  cookie: {},
  resave: false,
  saveUninitialized: false
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
      User.findOrCreate(null, function(err, user) {
        done(err, user);
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

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

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
