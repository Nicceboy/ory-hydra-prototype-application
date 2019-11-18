"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const web = __importStar(require("./web"));
async function main() {
    await web.start(config_1.SERVER_PORT);
    console.log(`Server started at http://localhost:${config_1.SERVER_PORT}`);
}
main().catch(error => console.error(error));
//# sourceMappingURL=main.js.map