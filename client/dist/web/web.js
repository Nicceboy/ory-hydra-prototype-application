"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
const crypto = require('crypto');
const base64url = require('base64url');
const { generators } = require('openid-client');
const { Issuer } = require('openid-client');
const groupCrud = __importStar(require("./GroupCRUD"));
const helper_1 = require("./helpers/helper");
const db = __importStar(require("./database"));
var connector = db.run();
const metaIssuser = {
    authorization_endpoint: 'http://127.0.0.1:4444/oauth2/auth',
    token_endpoint: 'http://127.0.0.1:4444/oauth2/token',
    issuer: 'http://127.0.0.1:4444/',
    jwks_uri: 'http://127.0.0.1:4444/.well-known/jwks.json'
};
const issuer = new Issuer(metaIssuser);
Issuer.discover('http://127.0.0.1:4444/.well-known/openid-configuration') // => Promise
    .then(function (googleIssuer) {
    console.log('Discovered issuer %s %O', googleIssuer.issuer, googleIssuer.metadata);
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
const app = express_1.default();
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
app.get('/token/callback', async (req, res) => {
    console.log(issuer);
    const params = client.callbackParams(req.url);
    const code_verifier = req.session.code_verifier;
    try {
        const a = await client
            .callback('http://localhost:5555/callback', params, {
            code_verifier,
            state: req.session.state
        }) // => Promise
            .then(function (token) {
            res.send({ result: 'success', token });
        });
    }
    catch (e) {
        console.log(e);
    }
});
//-----------------------Group Management-------------------------------
app.post('/group-management/CreateGroup/:token', async function (req, res) {
    console.log(req.params.token);
    const result = await groupCrud.CreateGroup(req.body, req.params.token);
    if (result.error_value == helper_1.ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.BadCredentials) {
        res.status(401).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
});
app.post('/group-management/AddToGroup/:token', async function (req, res) {
    const result = await groupCrud.AddUserInGroup(req.body, req.params.token);
    if (result.error_value == helper_1.ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.BadCredentials) {
        res.status(401).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
});
app.post('/group-management/JoinGroup/:token', async function (req, res) {
    const result = await groupCrud.JoinToGroup(req.body, req.params.token);
    if (result.error_value == helper_1.ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.BadCredentials) {
        res.status(401).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
});
app.get('/group-management/GroupInfo/:groupID/:userID/:token', async function (req, res) {
    const result = await groupCrud.GetGroupInfo(req.params.groupID, req.params.userID, req.params.token);
    if (result.error_value == helper_1.ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    else if (result.error_value == helper_1.ReturnErrors.BadCredentials) {
        res.status(401).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
});
//-----------------------------------------------------------------------
app.get('/*', (req, res) => {
    res.render('index');
});
exports.start = (port) => {
    const server = http_1.default.createServer(app);
    return new Promise((resolve, reject) => {
        server.listen(port, 'localhost');
    });
};
//# sourceMappingURL=web.js.map