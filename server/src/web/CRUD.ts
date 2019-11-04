import mongoose, { mongo } from 'mongoose';
import chalk from 'chalk';
import uuivd1 from 'uuid/v1'
import bcrypt from 'bcrypt'
import { CRUD_Result } from "../helpers/helper"
import { Dictionary } from 'express-serve-static-core';
import { ReturnErrors } from '../helpers/helper'


var userSchema = require('../model/user')
var Users = mongoose.model('users', userSchema);
var unsuccessful = chalk.bold.red;

//User CRUD
//----------------------------------------------------------------------------------------------
export async function CreateUser(reqBody: any): Promise<CRUD_Result> {
  let passwordHash: String = await hashPassword(reqBody.password);
  reqBody.password = passwordHash;
  var user = new Users(reqBody);
  let result = {} as CRUD_Result;
  user.set("ID", uuivd1());

  try {
    await user.save();
    result.error_value = ReturnErrors.None
    result.message = "User Successfuly created";
    result.return_value = user;

  } catch (error) {
    result.error_value = ReturnErrors.BadRequest
    result.message = error;
    result.return_value = null;
  }
  return result;
}
export async function CheckCredntials(reqBody: any): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;
  let email = reqBody.email;
  let password = reqBody.password;
  var user = await Users.findOne({ 'email': email })
  if (user == null) {
    result.error_value = ReturnErrors.BadCredentials
    result.message = "User with email: " + email + " does not exist";
    result.return_value = null;
  }
  else {
    let passwordCredentialResult: Boolean = await CheckHashedPassword(password, user.get('password'));
    if (passwordCredentialResult) {
      result.error_value = ReturnErrors.None
      result.message = "User Successfuly founded";
      result.return_value = null;
    }
    else {
      result.error_value = ReturnErrors.BadCredentials
      result.message = "Wrong password";
      result.return_value = null;
    }

  }
  return result;
}


export async function FindUser(email: String): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;
  var user = await Users.findOne({ 'email': email })
  if (user == null) {
    result.error_value = ReturnErrors.NotFound
    result.message = "User with email: " + email + " does not exist";
    result.return_value = null;
  } else {
    result.error_value = ReturnErrors.None
    result.message = "User Successfuly founded";
    result.return_value = user;
  }
  return result;
}

export async function UpdateUser(filter: Dictionary<String>, update: Dictionary<String>): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;

  try {
    var user = await Users.findOneAndUpdate(filter, update, { new: true });
    result.error_value = ReturnErrors.None
    result.message = "User Successfuly founded and updated";
    result.return_value = user;
  } catch (error) {
    result.error_value = ReturnErrors.NotFound
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
//----------------------------------------------------------------------------------------------
async function hashPassword(password: String): Promise<String> {

  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword as String;
}
async function CheckHashedPassword(password: String, hashedpassword: string): Promise<Boolean> {

  const saltRounds = 10;
  let result: Boolean = false;
  result = await bcrypt.compare(password, hashedpassword)
  return result;
}