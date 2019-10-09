import mongoose, { mongo } from 'mongoose';
import chalk from 'chalk';
import uuivd1 from 'uuid/v1'
import { CRUD_Result } from "../helpers/helper"
import { Dictionary } from 'express-serve-static-core';



var unsuccessful = chalk.bold.red;

var userSchema = require('../model/user')
var Users = mongoose.model('users', userSchema);


export async function CreateUser(reqBody: any): Promise<CRUD_Result> {
  var user = new Users(reqBody);
  let result = {} as CRUD_Result;
  user.set("ID", uuivd1());

  try {
    await user.save();
    result.error_value = 0
    result.message = "User Successfuly created";
    result.return_value = user;

  } catch (error) {
    result.error_value = 100
    result.message = error;
    result.return_value = null;
  }
  return result;
}

export async function FindUser(email: String): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;
  var user = await Users.findOne({ 'email': email })
  if (user == null) {
    result.error_value = 100
    result.message = "User with email: " + email + " does not exist";
    result.return_value = null;
  } else {
    result.error_value = 0
    result.message = "User Successfuly founded";
    result.return_value = user;
  }
  return result;
}

export async function UpdateUser(filter: Dictionary<String>, update: Dictionary<String>): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;

  try {
    var user = await Users.findOneAndUpdate(filter, update, { new: true });
    result.error_value = 0
    result.message = "User Successfuly founded and updated";
    result.return_value = user;
  } catch (error) {
    result.error_value = 100
    result.message = error;
    result.return_value = null;
  }

  return result;
}


export async function DeleteUser(filter: Dictionary<String>): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;

  try {
    var user = await Users.findOneAndDelete(filter);
    result.error_value = 0
    result.message = "User Successfuly founded and deleted";
    result.return_value = user;
  } catch (error) {
    result.error_value = 100
    result.message = error;
    result.return_value = null;
  }

  return result;
}
