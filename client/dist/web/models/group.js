"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    Name: {
        type: String
    },
    Purpose: {
        type: String
    },
    Description: {
        type: String
    },
    Admin: {
        type: String
    },
    UserList: {
        type: [String]
    }
});
groupSchema.set('timestamps', true);
module.exports = groupSchema;
//# sourceMappingURL=group.js.map