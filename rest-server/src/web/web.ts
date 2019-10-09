import express from "express";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import { SERVER_PORT } from "../config";
import { mongodb_url } from "../config"
import * as db from './database'
import * as crud from './CRUD'
import { CRUD_Result } from "../helpers/helper"
import chalk from 'chalk';
import bodyParser, { json } from 'body-parser';
import { EMSGSIZE } from "constants";


var successful = chalk.bold.cyan;
var error = chalk.bold.yellow;
var unsuccessful = chalk.bold.red;
var termination = chalk.bold.magenta;


var connector = db.run();

// Express app initialization
const app = express();

// Template configuration
app.set("view engine", "ejs");
app.set("views", "public");

// Static files configuration
app.use("/assets", express.static(path.join(__dirname, "frontend")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Controllers
app.get("/", (req, res) => {
    res.send("Hello world!!");
});



app.post('/createuser', async function (req, res) {
    const result: CRUD_Result = await crud.CreateUser(req.body);
    if (result.error_value == 0) {
        res.status(200).send(JSON.stringify(result));

    } else {
        res.status(500).send(JSON.stringify(result));

    }
    console.dir(JSON.stringify(result));
}
);
app.post('/finduser', async function (req, res) {
    let email: String = req.body.email;
    const result: CRUD_Result = await crud.FindUser(email);
    if (result.error_value == 0) {
        res.status(200).send(JSON.stringify(result));

    } else {
        res.status(500).send(JSON.stringify(result));

    }
    console.dir(JSON.stringify(result));
}
);

app.put('/user', async function (req, res) {
    var filter = req.body.email;
    const result: CRUD_Result = await crud.UpdateUser({ 'email': filter }, req.body);
    if (result.error_value == 0) {
        res.status(200).send(JSON.stringify(result));

    } else {
        res.status(500).send(JSON.stringify(result));

    }
    console.dir(JSON.stringify(result));
}
);
app.delete('/user', async function (req, res) {
    var filter = req.body.email;
    const result: CRUD_Result = await crud.DeleteUser({ 'email': filter });
    if (result.error_value == 0) {
        res.status(200).send(JSON.stringify(result));

    } else {
        res.status(500).send(JSON.stringify(result));

    }
    console.dir(JSON.stringify(result));
}
);


// Start function
export const start = (port: number): Promise<void> => {
    const server = http.createServer(app);

    return new Promise<void>((resolve, reject) => {
        server.listen(port, resolve);
    });
};

// async function AddUser(reqBody: any): Promise<CRUD_Result> {

//     let error = await connector.then(async () => {
//         return await crud.createUser(reqBody)
//     })
//     let message = "";
//     let result = {} as CRUD_Result;
//     if (error == 1) {
//         result.return_value = null;
//         message = "Error: User could not be created";
//         result.message = message;
//         result.error_value = 100;
//         return result;
//     }
//     result.return_value = reqBody;
//     message = "User successfuly created";
//     result.message = message;
//     result.error_value = 0;
//     return result;
// }



