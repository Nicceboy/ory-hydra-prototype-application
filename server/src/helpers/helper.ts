import mongoose from 'mongoose'


export class CRUD_Result {
    message: String;
    error_value: Number;
    return_value: mongoose.Document | null;
    constructor(message: String, return_value: mongoose.Document, error_value: Number) {
        this.message = message;
        this.return_value = return_value;
        this.error_value = error_value;
    }
}
export class CRUD_Error {
    message: String;
    error_value: Number;
    constructor(message: String, error_value: Number) {
        this.message = message;
        this.error_value = error_value;
    }
    get_json(): any {
        var ret =
        {
            "error_value": this.error_value,
            "message": this.message
        };
        return ret;
    }
}

export class GroupInfo_Result {
    message: String;
    error_value: Number;
    return_value: Object | null;
    constructor(message: String, return_value: Object, error_value: Number) {
        this.message = message;
        this.return_value = return_value;
        this.error_value = error_value;
    }
}

export enum ReturnErrors {
    None = 0,
    NotFound = 1,
    BadRequest = 2,
    BadCredentials = 3
}