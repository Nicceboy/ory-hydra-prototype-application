import mongoose, { mongo } from 'mongoose';

import { CRUD_Result, GroupInfo_Result } from "../helpers/helper";
import {ReturnErrors} from '../helpers/helper';
import { GridFSBucket } from 'mongodb';

var userSchema = require('../model/user')
var Users = mongoose.model('users', userSchema);

var groupSchema = require('../model/group');
var Group = mongoose.model('Group',groupSchema);


//-----------------------------Group Managment--------------------------------------------------

export async function CreateGroup(reqBody: any): Promise<CRUD_Result> 
{
  let group = new Group
  (
    {
        Name : reqBody.Name,
        Purpose : reqBody.Purpose,
        Admin : reqBody.UserID,
        Description : reqBody.Des,
        UserList : [reqBody.UserID]
    }
  );

  let result = {} as CRUD_Result;

  try {
    await group.save();
    result.error_value = ReturnErrors.None
    result.message = "Group with Id " + group.get("_id") + " Successfully created!" ;
    result.return_value = group;

  } catch (error) {
    result.error_value = ReturnErrors.BadRequest
    result.message = error;
    result.return_value = null;
  }
  return result;
}

export async function AddUserInGroup(reqBody: any): Promise<CRUD_Result> 
{
  console.log("User id is " + reqBody.UserID);
  var group = await Group.findByIdAndUpdate( {'_id' : reqBody.ID} ,{ $push : {'UserList' : reqBody.UserID}} , {upsert : true});
  let result = {} as CRUD_Result;
  if(group != null)
  {
    try {
      await group.save();
      result.error_value = ReturnErrors.None
      result.message = "Group with Id " + group.get("_id") + " Successfully Updated!" ;
      result.return_value = group;

    } catch (error) {
      result.error_value = ReturnErrors.BadRequest
      result.message = error;
      result.return_value = null;
    }
 }
 else
 {
  result.error_value = ReturnErrors.NotFound
  result.message = "Group with ID: " + reqBody.ID + " does not exist";
  result.return_value = null;
 }
  return result;
}

export async function GetGroupInfo(reqBody: any): Promise<GroupInfo_Result> 
{
  var group = await Group.findOne( {'_id' : reqBody.ID});
  let result = {} as GroupInfo_Result;
  if(group != null)
  {
      //When group found check if the current user is part of the user list
      if (group.get('UserList').indexOf(reqBody.UserID) > -1) {
        //User is part of the group

        //Next step check if user is the Admin of the group
        if(group.get('Admin') == reqBody.UserID)
        {
            //Current user is the Admin of the group
            var curUsers = group.get('UserList');
            var userModels = [];
            for(let val of curUsers) 
            {
              var usrObj = await Users.findOne({ '_id': val});
              userModels.push(usrObj); 
            }

            var updatedGroupAdmin = 
            {
                'Name' : group.get('Name'),
                'Admin' : group.get('Admin'),
                'Purpose' : group.get('Purpose'),
                'Description' : group.get('Description'),
                'UserList' : userModels
            };

            result.error_value = ReturnErrors.None
            result.message = "Group with Id " + group.get("_id") + " Successfully Found with Admin!" ;
            result.return_value = updatedGroupAdmin;
        }
        else
        {
            //Current user is not the Admin

            var curUsers = group.get('UserList');
            var userNames = [];
            for(let val of curUsers) 
            {
              var usrObj = await Users.findOne({ '_id': val});
              if(usrObj!=null)
              {
                userNames.push(usrObj.get('name')); 
              }
            }

            var updatedGroupUser = 
            {
                'Name' : group.get('Name'),
                'Admin' : group.get('Admin'),
                'Purpose' : group.get('Purpose'),
                'Description' : group.get('Description'),
                'UserList' : userNames
            };

            result.error_value = ReturnErrors.None
            result.message = "Group with Id " + group.get("_id") + " Successfully Found without Admin!" ;
            result.return_value = updatedGroupUser;
        }

      } 
      else 
      {
        //User is not part of the group
        //No need to return the description of group 
        //return on the user nameNames not the whole model
        
        var curUsers = group.get('UserList');
            var userNames = [];
            for(let val of curUsers) 
            {
              var usrObj = await Users.findOne({ '_id': val });
              if(usrObj!=null)
              {
                userNames.push(usrObj.get('name')); 
              }
            }

            var updatedGroupNonUser = 
            {
                'Name' : group.get('Name'),
                'Admin' : group.get('Admin'),
                'Purpose' : group.get('Purpose'),
                'UserList' : userNames
            };

        result.error_value = ReturnErrors.None
        result.message = "Group with Id " + group.get("_id") + " Successfully Found with User!" ;
        result.return_value = updatedGroupNonUser;

      }

 }
 else
 {
  result.error_value = ReturnErrors.NotFound
  result.message = "Group with ID: " + reqBody.ID + " does not exist";
  result.return_value = null;
 }
  return result;
}