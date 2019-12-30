"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CRUD_Result {
    constructor(message, return_value, error_value, redirect_to) {
        this.message = message;
        this.return_value = return_value;
        this.error_value = error_value;
        this.redirect_to = redirect_to;
    }
}
exports.CRUD_Result = CRUD_Result;
class TokenData {
    constructor(active, scope, sub, client_id, exp, iat, iss, token_type) {
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
exports.TokenData = TokenData;
class CRUD_Error {
    constructor(message, error_value) {
        this.message = message;
        this.error_value = error_value;
    }
    get_json() {
        var ret = {
            error_value: this.error_value,
            message: this.message
        };
        return ret;
    }
}
exports.CRUD_Error = CRUD_Error;
class GroupInfo_Result {
    constructor(message, return_value, error_value) {
        this.message = message;
        this.return_value = return_value;
        this.error_value = error_value;
    }
}
exports.GroupInfo_Result = GroupInfo_Result;
var ReturnErrors;
(function (ReturnErrors) {
    ReturnErrors[ReturnErrors["None"] = 0] = "None";
    ReturnErrors[ReturnErrors["NotFound"] = 1] = "NotFound";
    ReturnErrors[ReturnErrors["BadRequest"] = 2] = "BadRequest";
    ReturnErrors[ReturnErrors["BadCredentials"] = 3] = "BadCredentials";
})(ReturnErrors = exports.ReturnErrors || (exports.ReturnErrors = {}));
//# sourceMappingURL=helper.js.map