"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserRoute", {
    enumerable: true,
    get: function() {
        return UserRoute;
    }
});
const _express = require("express");
const _userscontroller = require("../controllers/users.controller");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
let UserRoute = class UserRoute {
    initializeRoutes() {
        this.router.get(`${this.path}users/getAllUsers`, this.user.getUsers);
        this.router.get(`${this.path}users/getUserInfo`, this.user.getUserInfo);
    }
    constructor(){
        _define_property(this, "path", '/');
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "user", new _userscontroller.UserController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=users.route.js.map