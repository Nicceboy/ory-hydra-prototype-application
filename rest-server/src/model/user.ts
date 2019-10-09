import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        ID: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
            unique: false,
        },
        given_name: {
            type: String,
            unique: false,
        },
        family_name: {
            type: String,
            unique: false,
        },
        middle_name: {
            type: String,
            unique: false,
        },
        nick_name: {
            type: String,
            unique: false,
        },
        preferred_username: {
            type: String,
            unique: false,
        },
        profile: {
            type: String,
            unique: false,
        },
        picture: {
            type: String,
            unique: false,
        },
        website: {
            type: String,
            unique: false,
        },
        email: {
            type: String,
            unique: true,
        },
        email_verified: {
            type: Boolean,
            unique: false,
        },
        gender: {
            type: String,
            unique: false,
        },
        birthdate: {
            type: String,
            unique: false,
        },
        zoneinfo: {
            type: String,
            unique: false,
        },
        locale: {
            type: String,
            unique: false,
        },
        phone_number: {
            type: String,
            unique: true,
        },
        phone_number_verified: {
            type: Boolean,
            unique: false,
        },
        address: {
            type: String,
            unique: false,
        }
    }
)
userSchema.set('timestamps', true);
export = userSchema
// var Users = mongoose.model('Users', userSchema);