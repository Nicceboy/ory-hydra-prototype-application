"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//require mongoose module
const mongoose_1 = __importDefault(require("mongoose"));
//require chalk module to give colors to console text
const chalk_1 = __importDefault(require("chalk"));
//require database URL from properties file
const config_1 = require("../config");
// import {userSchema} from "../model/user" 
// var userSchema = require('../model/user')
// var User = mongoose.model('User', userSchema);
var connected = chalk_1.default.bold.cyan;
var error = chalk_1.default.bold.yellow;
var disconnected = chalk_1.default.bold.red;
var termination = chalk_1.default.bold.magenta;
//export this function and imported by server.js
function run() {
    var connector = mongoose_1.default.connect(config_1.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    mongoose_1.default.connection.on('connected', function () {
        console.log(connected("Mongoose default connection is open to ", config_1.mongodb_url));
    });
    mongoose_1.default.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });
    mongoose_1.default.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });
    process.on('SIGINT', function () {
        mongoose_1.default.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0);
        });
    });
    return connector;
}
exports.run = run;
//# sourceMappingURL=database.js.map