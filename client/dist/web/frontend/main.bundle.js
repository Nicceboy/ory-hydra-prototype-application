/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/web/frontend/main.tsx","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/frontend/App.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/frontend/App.css ***!
  \************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".App {\r\n  text-align: center;\r\n}\r\n\r\n.App-logo {\r\n  height: 40vmin;\r\n}\r\n\r\n.App-header {\r\n  background-color: #282c34;\r\n  min-height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: calc(10px + 2vmin);\r\n  color: white;\r\n}\r\n\r\n.App-link {\r\n  color: #09d3ac;\r\n}\r\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/frontend/index.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/frontend/index.css ***!
  \**************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\r\n  margin: 0;\r\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\",\r\n    \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\",\r\n    sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\ncode {\r\n  font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\",\r\n    monospace;\r\n}\r\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/frontend/style.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/frontend/style.css ***!
  \**************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".App {\r\n  margin: 30px auto;\r\n  max-width: 60vw;\r\n  padding: 2em;\r\n  border: 1px solid silver;\r\n  border-radius: 1em;\r\n\r\n  text-align: center;\r\n}\r\n", ""]);


/***/ }),

/***/ "./src/web/frontend/App.css":
/*!**********************************!*\
  !*** ./src/web/frontend/App.css ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./App.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/frontend/App.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./src/web/frontend/App.tsx":
/*!**********************************!*\
  !*** ./src/web/frontend/App.tsx ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const Login_1 = __importDefault(__webpack_require__(/*! ./Login */ "./src/web/frontend/Login.tsx"));
const WelcomePage_1 = __importDefault(__webpack_require__(/*! ./WelcomePage */ "./src/web/frontend/WelcomePage.tsx"));
__webpack_require__(/*! ./App.css */ "./src/web/frontend/App.css");
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
const TokenPage_1 = __importDefault(__webpack_require__(/*! ./TokenPage */ "./src/web/frontend/TokenPage.tsx"));
function App(props) {
    console.log(props);
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/login", component: Login_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: WelcomePage_1.default }),
            react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/callback", component: TokenPage_1.default }))));
}
exports.default = App;


/***/ }),

/***/ "./src/web/frontend/Login.tsx":
/*!************************************!*\
  !*** ./src/web/frontend/Login.tsx ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const reactstrap_1 = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
const fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");
function Login(props) {
    const [email, setEmail] = react_1.useState('');
    const [password, setPassword] = react_1.useState('');
    const [loginChallenge, setLoginChallenge] = react_1.useState(props.location.search.split('=')[1]);
    console.log(email);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(reactstrap_1.Form, null,
            react_1.default.createElement(reactstrap_1.FormGroup, null,
                react_1.default.createElement(reactstrap_1.Label, { for: "exampleEmail" }, "Email"),
                react_1.default.createElement(reactstrap_1.Input, { type: "email", name: "email", id: "exampleEmail", placeholder: "with a placeholder", onChange: e => setEmail(e.target.value) })),
            react_1.default.createElement(reactstrap_1.FormGroup, null,
                react_1.default.createElement(reactstrap_1.Label, { for: "examplePassword" }, "Password"),
                react_1.default.createElement(reactstrap_1.Input, { type: "password", name: "password", id: "examplePassword", placeholder: "password placeholder", onChange: e => setPassword(e.target.value) })),
            react_1.default.createElement(reactstrap_1.Button, { onClick: () => {
                    const body = {
                        loginChallenge: loginChallenge,
                        subject: email,
                        password: password
                    };
                    fetch('/oauth2/auth/requests/login/accept', {
                        method: 'PUT',
                        body: JSON.stringify(body),
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then((res) => res.json()) // expecting a json response
                        .then((json) => {
                        fetch(json.redirect_to).then((a) => {
                            console.log(a);
                        });
                    });
                    console.log('login');
                } }, "Login"))));
}
exports.default = Login;


/***/ }),

/***/ "./src/web/frontend/TokenPage.tsx":
/*!****************************************!*\
  !*** ./src/web/frontend/TokenPage.tsx ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const semantic_ui_react_1 = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
const js_cookie_1 = __importDefault(__webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js"));
const fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");
function CreateCards() {
    let cards = [];
    for (let i = 0; i < 5; i++) {
        cards.push(react_1.default.createElement(semantic_ui_react_1.Card, null,
            react_1.default.createElement(semantic_ui_react_1.Image, { src: "/undefined.png", wrapped: true, ui: false }),
            react_1.default.createElement(semantic_ui_react_1.Card.Content, null,
                react_1.default.createElement(semantic_ui_react_1.Card.Header, null, "Matthew"),
                react_1.default.createElement(semantic_ui_react_1.Card.Meta, null,
                    react_1.default.createElement("span", { className: "date" }, "Joined in 2015")),
                react_1.default.createElement(semantic_ui_react_1.Card.Description, null, "Matthew is a musician living in Nashville.")),
            react_1.default.createElement(semantic_ui_react_1.Card.Content, { extra: true })));
    }
    return cards;
}
function TokenPage(props) {
    const [openid, setOpenid] = react_1.useState(0);
    const [data, setData] = react_1.useState("");
    const [email, setEmail] = react_1.useState("");
    const [gname, setGName] = react_1.useState("");
    const [fname, setFName] = react_1.useState("");
    const [username, setUsername] = react_1.useState("");
    const [phone, setPhone] = react_1.useState("");
    const [twofactor, setTwoFactor] = react_1.useState(false);
    react_1.useEffect(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch("/token/callback" + props.location.search);
            let data = yield result.json();
            console.log(data);
            let date = new Date("1970-01-01T00:00:00");
            //adding seccond to '1970-01-01T00:00:00', and 2 hours for some reason the expire time is missing 2 hour
            date = new Date(date.getTime() + 1000 * data.token.expires_at + 2 * 3600 * 1000);
            js_cookie_1.default.set("token", data.token.access_token, { expires: 3 / 24 });
            setData(data.token.access_token);
            if (data.token.access_token != undefined) {
                const result1 = yield fetch(`http://127.0.0.1:3002/user-management/user/${data.token.access_token}?data=phone_number&data=email&data=name&data=family_name&data=preferred_username&data=two_factor`);
                let data1 = yield result1.json();
                console.log(data1);
                let dataReturn = data1.return_value;
                if (data1.error_value === 0) {
                    setEmail(dataReturn.email);
                    setFName(dataReturn.family_name);
                    setGName(dataReturn.name);
                    setUsername(dataReturn.preferred_username);
                    setPhone(dataReturn.phone_number);
                    setTwoFactor(dataReturn.two_factor);
                    console.log(dataReturn.email);
                    console.log(dataReturn.two_factor);
                }
            }
        });
        fetchData();
    }, []);
    // useEffect(() => {
    //   const fetchData = async () => {
    //     let token: String = data as String;
    //     console.log(token);
    //     if (token != undefined) {
    //       const result = await fetch(
    //         `http://127.0.0.1:3002/user-management/user/${token}?data=phone_number&data=email&data=name&data=family_name&data=preferred_username&data=two_factor`
    //       );
    //       let data = await result.json();
    //       console.log(data);
    //       let dataReturn = data.return_value;
    //       if (data.error_value === 0) {
    //         setEmail(dataReturn.email);
    //         setFName(dataReturn.family_name);
    //         setGName(dataReturn.name);
    //         setUsername(dataReturn.preferred_username);
    //         setPhone(dataReturn.phone_number);
    //         setTwoFactor(dataReturn.two_factor);
    //         console.log(dataReturn.email);
    //         console.log(dataReturn.two_factor);
    //       }
    //     }
    //   };
    //   fetchData();
    // }, []);
    const panes = [
        {
            menuItem: "User Information",
            render: () => (react_1.default.createElement(semantic_ui_react_1.Tab.Pane, { attached: false },
                react_1.default.createElement(semantic_ui_react_1.Form, null,
                    react_1.default.createElement(semantic_ui_react_1.Form.Field, null,
                        react_1.default.createElement(semantic_ui_react_1.Label, null, "Name"),
                        react_1.default.createElement("input", { name: "name", type: "text", 
                            // placeholder={gname}
                            // disabled={true}
                            defaultValue: gname })),
                    react_1.default.createElement(semantic_ui_react_1.Divider, null),
                    react_1.default.createElement(semantic_ui_react_1.Form.Field, null,
                        react_1.default.createElement(semantic_ui_react_1.Label, null, "Family Name"),
                        react_1.default.createElement("input", { name: "family_name", type: "text", 
                            // placeholder={fname}
                            // disabled={true}
                            defaultValue: fname })),
                    react_1.default.createElement(semantic_ui_react_1.Divider, null),
                    react_1.default.createElement(semantic_ui_react_1.Form.Field, null,
                        react_1.default.createElement(semantic_ui_react_1.Label, null, "Phone number"),
                        react_1.default.createElement("input", { name: "phone_number", type: "text", 
                            // placeholder={phone}
                            // disabled={true}
                            defaultValue: phone })),
                    react_1.default.createElement(semantic_ui_react_1.Divider, null),
                    react_1.default.createElement(semantic_ui_react_1.Form.Field, null,
                        react_1.default.createElement(semantic_ui_react_1.Label, null, "Email"),
                        react_1.default.createElement("input", { name: "email", type: "text", 
                            // placeholder={email}
                            // disabled={true}
                            defaultValue: email })),
                    react_1.default.createElement(semantic_ui_react_1.Divider, null),
                    react_1.default.createElement(semantic_ui_react_1.Form.Field, null,
                        react_1.default.createElement(semantic_ui_react_1.Label, null, "Username"),
                        react_1.default.createElement("input", { name: "preferred_username", type: "text", 
                            // placeholder={username}
                            // disabled={true}
                            defaultValue: username })),
                    react_1.default.createElement(semantic_ui_react_1.Divider, null),
                    react_1.default.createElement(semantic_ui_react_1.Form.Field, null,
                        react_1.default.createElement(semantic_ui_react_1.Checkbox, { toggle: true, label: "TwoFactor", checked: twofactor, disabled: true })))))
        },
        {
            menuItem: "Groups",
            render: () => react_1.default.createElement(semantic_ui_react_1.Tab.Pane, { attached: false }, CreateCards())
        }
    ];
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(semantic_ui_react_1.Tab, { menu: { secondary: true, pointing: true }, panes: panes })));
}
exports.default = TokenPage;


/***/ }),

/***/ "./src/web/frontend/WelcomePage.tsx":
/*!******************************************!*\
  !*** ./src/web/frontend/WelcomePage.tsx ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const reactstrap_1 = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
const fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");
const Example = (props) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(reactstrap_1.Jumbotron, null,
            react_1.default.createElement("h1", { className: "display-3" }, "Hello, world!"),
            react_1.default.createElement("p", { className: "lead" }, "This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information."),
            react_1.default.createElement("hr", { className: "my-2" }),
            react_1.default.createElement("p", null, "It uses utility classes for typography and spacing to space content out within the larger container."),
            react_1.default.createElement("p", { className: "lead" },
                react_1.default.createElement(reactstrap_1.Button, { color: "primary", onClick: () => {
                        fetch('/oauth2/code')
                            .then((res) => res.json())
                            .then((json) => {
                            console.log(json);
                            window.location.href = json;
                        });
                    } }, "Login"),
                react_1.default.createElement(reactstrap_1.Button, { color: "primary", onClick: () => {
                        window.location.href = 'http://127.0.0.1:3002';
                    } }, "Register")))));
};
exports.default = Example;


/***/ }),

/***/ "./src/web/frontend/index.css":
/*!************************************!*\
  !*** ./src/web/frontend/index.css ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/frontend/index.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./src/web/frontend/main.tsx":
/*!***********************************!*\
  !*** ./src/web/frontend/main.tsx ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
__webpack_require__(/*! ./index.css */ "./src/web/frontend/index.css");
const App_1 = __importDefault(__webpack_require__(/*! ./App */ "./src/web/frontend/App.tsx"));
__webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
__webpack_require__(/*! ./style.css */ "./src/web/frontend/style.css");
//import * as serviceWorker from './serviceWorker';
console.log('wtf');
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
react_dom_1.default.render(react_1.default.createElement(App_1.default, null), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();


/***/ }),

/***/ "./src/web/frontend/style.css":
/*!************************************!*\
  !*** ./src/web/frontend/style.css ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/frontend/style.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map