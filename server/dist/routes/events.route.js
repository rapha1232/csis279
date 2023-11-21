"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventsRoute", {
    enumerable: true,
    get: function() {
        return EventsRoute;
    }
});
const _eventscontroller = require("../controllers/events.controller");
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
let EventsRoute = class EventsRoute {
    initializeRoutes() {
        this.router.get(`${this.path}getAll`, this.events.getAll);
        this.router.post(`${this.path}like`, this.events.likeEvent);
        this.router.post(`${this.path}unlike`, this.events.unlikeEvent);
        this.router.post(`${this.path}save`, this.events.saveEvent);
        this.router.post(`${this.path}unsave`, this.events.unsaveEvent);
        this.router.get(`${this.path}getAllWithFilter`, this.events.filtered);
        this.router.post(`${this.path}create`, this.events.create);
    }
    constructor(){
        _define_property(this, "path", '/events/');
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "events", new _eventscontroller.EventsController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=events.route.js.map