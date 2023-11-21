"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DiscussionsRoute", {
    enumerable: true,
    get: function() {
        return DiscussionsRoute;
    }
});
const _discussionscontroller = require("../controllers/discussions.controller");
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
let DiscussionsRoute = class DiscussionsRoute {
    initializeRoutes() {
        this.router.get(`${this.path}getAllTopics`, this.discussions.getAll);
        this.router.post(`${this.path}likeTopic`, this.discussions.likeTopic);
        this.router.post(`${this.path}unlikeTopic`, this.discussions.unlikeTopic);
        this.router.post(`${this.path}saveTopic`, this.discussions.saveTopic);
        this.router.post(`${this.path}unsaveTopic`, this.discussions.unsaveTopic);
        this.router.get(`${this.path}getAllWithFilter`, this.discussions.filtered);
        this.router.post(`${this.path}create`, this.discussions.create);
        this.router.get(`${this.path}getOne`, this.discussions.getOne);
    }
    constructor(){
        _define_property(this, "path", '/discussions/');
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "discussions", new _discussionscontroller.DiscussionsController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=discussions.route.js.map