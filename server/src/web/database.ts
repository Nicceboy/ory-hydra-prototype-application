//require mongoose module
import mongoose, { mongo } from 'mongoose';

//require chalk module to give colors to console text
import chalk from 'chalk';

//require database URL from properties file
import {mongodb_url} from "../config"

// import {userSchema} from "../model/user" 
// var userSchema = require('../model/user')
// var User = mongoose.model('User', userSchema);


var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by server.js
export function run() : Promise<any>{
    var connector = mongoose.connect(mongodb_url, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false });

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", mongodb_url));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
    return connector;
}