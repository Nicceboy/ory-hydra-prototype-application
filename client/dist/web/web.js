"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
const uuid = require('node-uuid');
const oauth2 = require('simple-oauth2');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
// Express app initialization
const app = express_1.default();
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
app.use(bodyParser.urlencoded({
    extended: true
}));
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
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'frontend')));
app.get('/oauth2/code', (req, res) => {
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
app.get('/token/callback', async (req, res) => {
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
        .then((token) => {
        req.session.oauth2_flow = { token }; // code returns {access_token} because why not...
        res.send({ result: 'success', token });
    })
        .catch((err) => {
        if (err.data.payload) {
            res.send(JSON.stringify(err.data.payload));
            return;
        }
        res.send(JSON.stringify({ error: err.toString() }));
    });
});
app.get('/*', (req, res) => {
    console.log('fuck');
    res.render('index');
});
// Start function
exports.start = (port) => {
    const server = http_1.default.createServer(app);
    return new Promise((resolve, reject) => {
        server.listen(port, 'localhost');
    });
};
//# sourceMappingURL=web.js.map