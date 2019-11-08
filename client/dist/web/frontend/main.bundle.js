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
/******/ 	deferredModules.push(["./src/web/frontend/App.tsx","vendors~main"]);
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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const reactstrap_1 = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
const fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");
function TokenPage(props) {
    const [openid, setOpenid] = react_1.useState(0);
    const [data, setData] = react_1.useState({});
    react_1.useEffect(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch('/callback' + props.location.search);
            let data = yield result.json();
            console.log(data);
        });
        fetchData();
    });
    console.log(data);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(reactstrap_1.Form, null,
            react_1.default.createElement(reactstrap_1.Button, null, "Login"))));
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
                            window.location.href = json;
                        });
                    } }, "Login"),
                react_1.default.createElement(reactstrap_1.Button, { color: "primary", onClick: () => {
                        window.location.href = 'http://127.0.0.1:3002';
                    } }, "Register")))));
};
exports.default = Example;


/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map