import mongoose from 'mongoose';

export class CRUD_Result {
    message: String;
    error_value: Number;
    return_value: mongoose.Document | null;

    redirect_to: String;
    constructor(
        message: String,
        return_value: mongoose.Document,
        error_value: Number,
        redirect_to: String
    ) {
        this.message = message;
        this.return_value = return_value;
        this.error_value = error_value;
        this.redirect_to = redirect_to;
    }
}


export class TokenData {
    active: Boolean;
    scope: String | null;
    sub: String | null;

    client_id: String | null;
    exp: Number | null;
    iat: Number | null;
    iss: String | null;
    token_type: String | null;
    constructor(
        active: Boolean,
        scope: String,
        sub: String,
        client_id: String,
        exp: Number,
        iat: Number,
        iss: String,
        token_type: String
    ) {
        this.active = active;
        this.scope = scope;
        this.sub = sub;
        this.client_id = client_id;
        this.exp = exp;
        this.iat = iat;
        this.iss = iss;
        this.token_type = token_type;
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
        var ret = {
            error_value: this.error_value,
            message: this.message
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
