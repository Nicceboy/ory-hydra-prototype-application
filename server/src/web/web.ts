import express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import { SERVER_PORT } from '../config';
import { mongodb_url } from '../config';
import * as db from './database';
import * as crud from './CRUD';
import * as groupCrud from './GroupCRUD';
import { CRUD_Result } from '../helpers/helper';
import { GroupInfo_Result } from '../helpers/helper';
import chalk from 'chalk';
import bodyParser, { json } from 'body-parser';
import { EMSGSIZE } from 'constants';
import { ReturnErrors } from '../helpers/helper';

const fetch = require('node-fetch');

var successful = chalk.bold.cyan;
var error = chalk.bold.yellow;
var unsuccessful = chalk.bold.red;
var termination = chalk.bold.magenta;

var connector = db.run();

// Express app initialization
const app = express();

// // Template configuration
app.set('view engine', 'ejs');
app.set('views', 'public');

// // Static files configuration
// app.use("/assets", express.static(path.join(__dirname, "frontend")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'frontend')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  next();
});

app.get('/', (req: any, res: any) => {
  res.render('index');
});
//user management
//-----------------------------------------------------------------------
app.post('/user-management/user', async function (req, res) {
  const result: CRUD_Result = await crud.CreateUser(req.body);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});
app.post('/user-management/user-login', async function (req, res) {
  console.log(req.body);
  const result: CRUD_Result = await crud.CheckCredntials(req.body);
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
app.get('/user-management/user/:token', async function (req, res) {
  console.log("Token Request!!");
  console.log(req.params.token);
  let token: string = req.params.token;
  console.log(req.query.data);
  const result: CRUD_Result = await crud.FindUser(token, req.query.data);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});
app.put('/user-management/user/:email', async function (req, res) {
  var filter = req.params.email;
  console.log(filter);
  const result: CRUD_Result = await crud.UpdateUser(
    { email: filter },
    req.body
  );
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});
app.delete('/user-management/user/:email', async function (req, res) {
  var filter = req.params.email;
  const result: CRUD_Result = await crud.DeleteUser({ email: filter });
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});

//-----------------------------------------------------------------------

//-----------------------Group Management-------------------------------
app.post('/CreateGroup', async function (req, res) {
  const result: CRUD_Result = await groupCrud.CreateGroup(req.body);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});

app.post('/JoinGroup', async function (req, res) {
  const result: CRUD_Result = await groupCrud.AddUserInGroup(req.body);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});

app.post('/GroupInfo', async function (req, res) {
  const result: GroupInfo_Result = await groupCrud.GetGroupInfo(req.body);
  if (result.error_value == ReturnErrors.None) {
    res.status(200).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.NotFound) {
    res.status(404).send(JSON.stringify(result));
  } else if (result.error_value == ReturnErrors.BadRequest) {
    res.status(400).send(JSON.stringify(result));
  }
  console.dir(JSON.stringify(result));
});
//-----------------------------------------------------------------------

// Start function
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, resolve);
  });
};
