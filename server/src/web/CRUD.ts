import mongoose, { mongo } from 'mongoose';
import chalk from 'chalk';
import uuivd1 from 'uuid/v1'
import bcrypt from 'bcrypt'
import { CRUD_Result, TokenData } from "../helpers/helper"
import { Dictionary } from 'express-serve-static-core';
import { ReturnErrors } from '../helpers/helper'
const fetch = require('node-fetch');
import qs from 'qs'


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
  var user = await Users.findOne({ 'email': email }).select('two_factor two_factorization_secret password')
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
      result.return_value = user.toJSON();
    }
    else {
      result.error_value = ReturnErrors.BadCredentials
      result.message = "Wrong password";
      result.return_value = null;
    }

  }
  return result;
}

export async function FindUser(token: string, data: String): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;
  if (data == null)
    data = "_id";

  const token_data = await GetTokenData(token);
  if (token_data.active == true) {
    let email: String = token_data.sub as String;
    var user = await Users.findOne({ 'email': email }, data)
    if (user == null) {
      result.error_value = ReturnErrors.NotFound
      result.message = "User with email: " + email + " does not exist";
      result.return_value = null;
    } else {
      result.error_value = ReturnErrors.None
      result.message = "User Successfuly founded";
      result.return_value = user;
    }
  }
  else {
    result.error_value = ReturnErrors.BadCredentials
    result.message = "Token expired!!";
    result.return_value = null;
  }

  return result;
}

export async function GetTokenData(token: string): Promise<TokenData> {
  const url = 'http://127.0.0.1:4445/oauth2/introspect'
  let result = new TokenData(false, "", "", "", 0, 0, "", "");
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'

    },
    body: qs.stringify({ token: token })

  })
  const json = await response.json();
  console.log(json);
  result = json
  return result;
}
export async function UpdateUser(filter: Dictionary<String>, update: Dictionary<String>): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;
  var user = await Users.findOne({ 'email': filter.email }).select('password')
  if (user != null) {
    let passwordCredentialResult: Boolean = await CheckHashedPassword(filter.password, user.get('password'));
    try {
      if (passwordCredentialResult) {
        delete update['password']
        user = await Users.findOneAndUpdate({ 'email': filter.email }, update, { new: true }).select(update);
        if (user == null) {
          result.error_value = ReturnErrors.NotFound
          result.message = "User not found!!";
          result.return_value = null;
        } else {
          result.error_value = ReturnErrors.None
          result.message = "User Successfuly founded and updated";
          result.return_value = user;
        }
      }
      else {
        result.error_value = ReturnErrors.BadCredentials
        result.message = 'Bad Credentials';
        result.return_value = null;
      }

    } catch (error) {
      result.error_value = ReturnErrors.BadRequest
      result.message = error;
      result.return_value = null;
    }

  } else {
    result.error_value = ReturnErrors.NotFound
    result.message = "User not found!!";
    result.return_value = null;
  }


  return result;
}


export async function DeleteUser(filter: Dictionary<String>): Promise<CRUD_Result> {
  let result = {} as CRUD_Result;
  var user = await Users.findOne({ 'email': filter.email }).select('password')

  if (user != null) {
    let passwordCredentialResult: Boolean = await CheckHashedPassword(filter.password, user.get('password'));
    try {
      if (passwordCredentialResult) {
        user = await Users.findOneAndDelete({ 'email': filter.email });
        if (user == null) {
          result.error_value = ReturnErrors.NotFound
          result.message = "User not found!!";
          result.return_value = null;
        } else {
          result.error_value = ReturnErrors.None
          result.message = "User Successfuly founded and deleted";
          result.return_value = user;
        }
      }
      else {
        result.error_value = ReturnErrors.BadCredentials
        result.message = 'Bad Credentials';
        result.return_value = null;
      }

    } catch (error) {
      result.error_value = ReturnErrors.BadRequest
      result.message = error;
      result.return_value = null;
    }

  } else {
    result.error_value = ReturnErrors.NotFound
    result.message = "User not found!!";
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