"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserController", {
    enumerable: true,
    get: function() {
        return UserController;
    }
});
const _usersservice = require("../services/users.service");
const _typedi = require("typedi");
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
let UserController = class UserController {
    constructor(){
        _define_property(this, "user", _typedi.Container.get(_usersservice.UserService));
        _define_property(this, "getUsers", async (req, res, next)=>{
            try {
                const findAllUsersData = await this.user.getAllUsers();
                res.status(200).json({
                    data: findAllUsersData,
                    message: 'findAll'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getUserInfo", async (req, res, next)=>{
            const UserID = req.query.UserID;
            try {
                const userInfoData = await this.user.getUserInfo(Number(UserID));
                res.status(200).json({
                    data: userInfoData,
                    message: 'getInfo'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=users.controller.js.map