"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RepliesRoute", {
    enumerable: true,
    get: function() {
        return RepliesRoute;
    }
});
const _repliescontroller = require("../controllers/replies.controller");
const _express = require("express");
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
let RepliesRoute = class RepliesRoute {
    initializeRoutes() {
        this.router.get(`${this.path}getAllReplies`, this.replies.getAll);
        this.router.post(`${this.path}likeReply`, this.replies.likeReply);
        this.router.post(`${this.path}unlikeReply`, this.replies.unlikeReply);
        this.router.get(`${this.path}getAllWithFilter`, this.replies.filtered);
        this.router.post(`${this.path}createQuestionReply`, this.replies.createQuestionReply);
        this.router.post(`${this.path}createTopicReply`, this.replies.createTopicReply);
    }
    constructor(){
        _define_property(this, "path", '/replies/');
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "replies", new _repliescontroller.RepliesController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=replies.route.js.map