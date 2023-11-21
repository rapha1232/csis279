"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserService", {
    enumerable: true,
    get: function() {
        return UserService;
    }
});
const _client = require("@prisma/client");
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UserService = class UserService {
    async getAllUsers() {
        const allUser = await this.user.findMany({
            select: {
                UserID: true,
                FirstName: true,
                LastName: true,
                Email: true
            }
        });
        return allUser;
    }
    async getUserInfo(UserID) {
        const userInfo = await this.user.findUnique({
            where: {
                UserID: UserID
            },
            select: {
                UserID: true,
                FirstName: true,
                LastName: true,
                Email: true
            }
        });
        return userInfo;
    }
    constructor(){
        _define_property(this, "user", new _client.PrismaClient().user);
    }
};
UserService = _ts_decorate([
    (0, _typedi.Service)()
], UserService);

//# sourceMappingURL=users.service.js.map