"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const helper_1 = require("./helpers/helper");
const helper_2 = require("./helpers/helper");
const qs_1 = __importDefault(require("qs"));
const fetch = require('node-fetch');
var userSchema = require('./models/user');
var Users = mongoose_1.default.model('users', userSchema);
var groupSchema = require('./models/group');
var Group = mongoose_1.default.model('Group', groupSchema);
//-----------------------------Group Managment--------------------------------------------------
async function CreateGroup(reqBody, token) {
    const token_data = await GetTokenData(token);
    let result = {};
    console.log(token_data.active);
    if (token_data.active == true && token_data.sub == reqBody.email) {
        let group = new Group({
            Name: reqBody.Name,
            Purpose: reqBody.Purpose,
            Admin: reqBody.email,
            Description: reqBody.Des,
            UserList: [reqBody.email]
        });
        try {
            await group.save();
            result.error_value = helper_1.ReturnErrors.None;
            result.message = "Group with Id " + group.get("_id") + " Successfully created!";
            result.return_value = group;
        }
        catch (error) {
            result.error_value = helper_1.ReturnErrors.BadRequest;
            result.message = error;
            result.return_value = null;
        }
    }
    else {
        if (token_data.sub != reqBody.email) {
            result.error_value = helper_1.ReturnErrors.BadCredentials;
            result.message = "invalid email";
            result.return_value = null;
        }
        if (token_data.active == false) {
            result.error_value = helper_1.ReturnErrors.BadCredentials;
            result.message = "invalid token";
            result.return_value = null;
        }
    }
    return result;
}
exports.CreateGroup = CreateGroup;
async function AddUserInGroup(reqBody, token) {
    console.log("User email is " + reqBody.email);
    var group = await Group.findOneAndUpdate({ '_id': reqBody.ID }, { $push: { 'UserList': reqBody.email } }, { upsert: true });
    let result = {};
    const token_data = await GetTokenData(token);
    console.log(token_data.active);
    if (token_data.active == true && token_data.sub == reqBody.Admin) {
        if (group != null) {
            try {
                await group.save();
                group = await Group.findOne({ '_id': reqBody.ID });
                if (group != null) {
                    result.error_value = helper_1.ReturnErrors.None;
                    result.message = "Group with Id " + group.get("_id") + " Successfully Updated!";
                    result.return_value = group;
                }
                else {
                    result.error_value = helper_1.ReturnErrors.None;
                    result.message = "Group with Id not found";
                    result.return_value = group;
                }
            }
            catch (error) {
                result.error_value = helper_1.ReturnErrors.BadRequest;
                result.message = error;
                result.return_value = null;
            }
        }
        else {
            result.error_value = helper_1.ReturnErrors.NotFound;
            result.message = "Group with ID: " + reqBody.ID + " does not exist";
            result.return_value = null;
        }
    }
    else {
        if (token_data.sub != reqBody.email) {
            result.error_value = helper_1.ReturnErrors.BadCredentials;
            result.message = "invalid email";
            result.return_value = null;
        }
        if (token_data.active == false) {
            result.error_value = helper_1.ReturnErrors.BadCredentials;
            result.message = "invalid token";
            result.return_value = null;
        }
    }
    return result;
}
exports.AddUserInGroup = AddUserInGroup;
async function JoinToGroup(reqBody, token) {
    console.log("User email is " + reqBody.email);
    var group = await Group.findOneAndUpdate({ '_id': reqBody.ID }, { $push: { 'UserList': reqBody.email } }, { upsert: true });
    let result = {};
    const token_data = await GetTokenData(token);
    console.log(token_data.active);
    if (token_data.active == true && token_data.sub == reqBody.email) {
        if (group != null) {
            try {
                await group.save();
                group = await Group.findOne({ '_id': reqBody.ID });
                if (group != null) {
                    var curUsers = group.get('UserList');
                    var userNames = [];
                    for (let val of curUsers) {
                        var usrObj = await Users.findOne({ 'email': val });
                        if (usrObj != null) {
                            userNames.push(usrObj.get('name'));
                        }
                    }
                    var updatedGroupUser = {
                        'Name': group.get('Name'),
                        'Admin': group.get('Admin'),
                        'Purpose': group.get('Purpose'),
                        'Description': group.get('Description'),
                        'UserList': userNames
                    };
                    result.error_value = helper_1.ReturnErrors.None;
                    result.message = "Group with Id " + group.get("_id") + " Successfully Found without Admin!";
                    result.return_value = updatedGroupUser;
                }
            }
            catch (error) {
                result.error_value = helper_1.ReturnErrors.BadRequest;
                result.message = error;
                result.return_value = null;
            }
        }
        else {
            result.error_value = helper_1.ReturnErrors.NotFound;
            result.message = "Group with ID: " + reqBody.ID + " does not exist";
            result.return_value = null;
        }
    }
    else {
        if (token_data.sub != reqBody.email) {
            result.error_value = helper_1.ReturnErrors.BadCredentials;
            result.message = "invalid email";
            result.return_value = null;
        }
        if (token_data.active == false) {
            result.error_value = helper_1.ReturnErrors.BadCredentials;
            result.message = "invalid token";
            result.return_value = null;
        }
    }
    return result;
}
exports.JoinToGroup = JoinToGroup;
async function GetGroupInfo(groupID, email, token) {
    var group = await Group.findOne({ '_id': groupID });
    let result = {};
    const token_data = await GetTokenData(token);
    console.log(token_data.active);
    if (token_data.active == true && token_data.sub == email) {
        if (group != null) {
            //When group found check if the current user is part of the user list
            if (group.get('UserList').indexOf(email) > -1) {
                //User is part of the group
                //Next step check if user is the Admin of the group
                if (group.get('Admin') == email) {
                    //Current user is the Admin of the group
                    var curUsers = group.get('UserList');
                    var userModels = [];
                    for (let val of curUsers) {
                        var usrObj = await Users.findOne({ 'email': val });
                        userModels.push(usrObj);
                    }
                    var updatedGroupAdmin = {
                        'Name': group.get('Name'),
                        'Admin': group.get('Admin'),
                        'Purpose': group.get('Purpose'),
                        'Description': group.get('Description'),
                        'UserList': userModels
                    };
                    result.error_value = helper_1.ReturnErrors.None;
                    result.message = "Group with Id " + group.get("_id") + " Successfully Found with Admin!";
                    result.return_value = updatedGroupAdmin;
                }
                else {
                    //Current user is not the Admin
                    var curUsers = group.get('UserList');
                    var userNames = [];
                    for (let val of curUsers) {
                        var usrObj = await Users.findOne({ 'email': val });
                        if (usrObj != null) {
                            userNames.push(usrObj.get('name'));
                        }
                    }
                    var updatedGroupUser = {
                        'Name': group.get('Name'),
                        'Admin': group.get('Admin'),
                        'Purpose': group.get('Purpose'),
                        'Description': group.get('Description'),
                        'UserList': userNames
                    };
                    result.error_value = helper_1.ReturnErrors.None;
                    result.message = "Group with Id " + group.get("_id") + " Successfully Found without Admin!";
                    result.return_value = updatedGroupUser;
                }
            }
            else {
                //User is not part of the group
                //No need to return the description of group 
                //return on the user nameNames not the whole model
                var curUsers = group.get('UserList');
                var userNames = [];
                for (let val of curUsers) {
                    var usrObj = await Users.findOne({ 'email': val });
                    if (usrObj != null) {
                        userNames.push(usrObj.get('name'));
                    }
                }
                var updatedGroupNonUser = {
                    'Name': group.get('Name'),
                    'Admin': group.get('Admin'),
                    'Purpose': group.get('Purpose'),
                    'UserList': userNames
                };
                result.error_value = helper_1.ReturnErrors.None;
                result.message = "Group with Id " + group.get("_id") + " Successfully Found with User!";
                result.return_value = updatedGroupNonUser;
            }
        }
        else {
            result.error_value = helper_1.ReturnErrors.NotFound;
            result.message = "Group with ID: " + groupID + " does not exist";
            result.return_value = null;
        }
    }
    else {
        if (token_data.sub != email) {
            result.error_value = helper_1.ReturnErrors.BadCredentials;
            result.message = "invalid email";
            result.return_value = null;
        }
        if (token_data.active == false) {
            result.error_value = helper_1.ReturnErrors.BadCredentials;
            result.message = "invalid token";
            result.return_value = null;
        }
    }
    return result;
}
exports.GetGroupInfo = GetGroupInfo;
async function GetTokenData(token) {
    const url = 'http://127.0.0.1:4445/oauth2/introspect';
    let result = new helper_2.TokenData(false, "", "", "", 0, 0, "", "");
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'
        },
        body: qs_1.default.stringify({ token: token })
    });
    const json = await response.json();
    console.log(json);
    result = json;
    return result;
}
exports.GetTokenData = GetTokenData;
//# sourceMappingURL=GroupCRUD.js.map