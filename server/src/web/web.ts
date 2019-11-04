import express from "express";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import { SERVER_PORT } from "../config";
import { mongodb_url } from "../config"
import * as db from './database'
import * as crud from './CRUD'
import * as groupCrud from './GroupCRUD'
import { CRUD_Result } from "../helpers/helper"
import { GroupInfo_Result } from "../helpers/helper"
import chalk from 'chalk';
import bodyParser, { json } from 'body-parser';
import { EMSGSIZE } from "constants";
import { ReturnErrors } from '../helpers/helper'

var successful = chalk.bold.cyan;
var error = chalk.bold.yellow;
var unsuccessful = chalk.bold.red;
var termination = chalk.bold.magenta;


var connector = db.run();

// Express app initialization
const app = express();

// // Template configuration
app.set("view engine", "ejs");
app.set("views", "public");

// // Static files configuration
// app.use("/assets", express.static(path.join(__dirname, "frontend")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, '/../public')));
console.log(path.join(__dirname, '/../public'));


app.get('/*', (req: any, res: any) => {
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

    }
    else if (result.error_value == ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
}
);
app.get('/user-management/user/:email', async function (req, res) {
    let email: String = req.params.email;
    const result: CRUD_Result = await crud.FindUser(email);
    if (result.error_value == ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));

    } else if (result.error_value == ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));

    }
    else if (result.error_value == ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
}
);

app.put('/user-management/user/:email', async function (req, res) {
    var filter = req.params.email;
    const result: CRUD_Result = await crud.UpdateUser({ 'email': filter }, req.body);
    if (result.error_value == ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));

    } else if (result.error_value == ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));

    }
    else if (result.error_value == ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
}
);
app.delete('/user-management/user/:email', async function (req, res) {
    var filter = req.params.email;
    const result: CRUD_Result = await crud.DeleteUser({ 'email': filter });
    if (result.error_value == ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));

    } else if (result.error_value == ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));

    }
    else if (result.error_value == ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
}
);

//-----------------------------------------------------------------------

//-----------------------Group Management-------------------------------
app.post('/CreateGroup', async function (req, res) {
    const result: CRUD_Result = await groupCrud.CreateGroup(req.body);
    if (result.error_value == ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));

    } else if (result.error_value == ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));

    }
    else if (result.error_value == ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
}
);

app.post('/JoinGroup', async function (req, res) {
    const result: CRUD_Result = await groupCrud.AddUserInGroup(req.body);
    if (result.error_value == ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));

    } else if (result.error_value == ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));
    }
    else if (result.error_value == ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
}
);

app.post('/GroupInfo', async function (req, res) {
    const result: GroupInfo_Result = await groupCrud.GetGroupInfo(req.body);
    if (result.error_value == ReturnErrors.None) {
        res.status(200).send(JSON.stringify(result));

    } else if (result.error_value == ReturnErrors.NotFound) {
        res.status(404).send(JSON.stringify(result));
    }
    else if (result.error_value == ReturnErrors.BadRequest) {
        res.status(400).send(JSON.stringify(result));
    }
    console.dir(JSON.stringify(result));
}
);
//-----------------------------------------------------------------------

// Start function
export const start = (port: number): Promise<void> => {
    const server = http.createServer(app);

    return new Promise<void>((resolve, reject) => {
        server.listen(port, resolve);
    });
};