import mongoose from "mongoose";

const groupSchema = new mongoose.Schema
(
    {
        Name:
        {
            type: String
        },
        Purpose:
        {
            type: String
        },
        Description:
        {
            type: String
        },
        Admin:
        {
            type: String
        },
        UserList:
        {
            type: [String]
        }
    }
)

groupSchema.set('timestamps', true);
export = groupSchema

