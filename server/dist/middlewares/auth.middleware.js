"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthMiddleware", {
    enumerable: true,
    get: function() {
        return AuthMiddleware;
    }
});
const _config = require("../config");
const _HttpException = require("../exceptions/HttpException");
const _client = require("@prisma/client");
const _jsonwebtoken = require("jsonwebtoken");
const getAuthorization = (req)=>{
    const { body } = req;
    if (body && body.Authorization) {
        const authorizationString = body.Authorization;
        const parts = authorizationString.split('=');
        if (parts.length === 2) {
            return parts[1]; // Return what's after the equal sign
        }
    }
    return null;
};
const AuthMiddleware = async (req, res, next)=>{
    try {
        const Authorization = getAuthorization(req);
        if (Authorization) {
            const { UserID } = await (0, _jsonwebtoken.verify)(Authorization, _config.SECRET_KEY);
            const users = new _client.PrismaClient().user;
            const findUser = await users.findUnique({
                where: {
                    UserID: Number(UserID)
                }
            });
            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new _HttpException.HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new _HttpException.HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new _HttpException.HttpException(401, 'Wrong authentication token'));
    }
};

//# sourceMappingURL=auth.middleware.js.map