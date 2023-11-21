"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventsController", {
    enumerable: true,
    get: function() {
        return EventsController;
    }
});
const _eventsservice = require("../services/events.service");
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
let EventsController = class EventsController {
    constructor(){
        _define_property(this, "e", _typedi.Container.get(_eventsservice.EventsService));
        _define_property(this, "getAll", async (req, res, next)=>{
            try {
                const allEvents = await this.e.getAll();
                res.status(201).json({
                    data: allEvents,
                    message: 'get All Events'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "likeEvent", async (req, res, next)=>{
            try {
                const { EventID, UserID } = req.query;
                await this.e.likeEvent(Number(EventID), Number(UserID));
                res.status(201).json({
                    message: 'liked Event'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "unlikeEvent", async (req, res, next)=>{
            try {
                const { EventID, UserID } = req.query;
                await this.e.unlike(Number(EventID), Number(UserID));
                res.status(201).json({
                    message: 'unliked Event'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "saveEvent", async (req, res, next)=>{
            try {
                const { EventID, UserID } = req.query;
                await this.e.saveEvent(Number(EventID), Number(UserID));
                res.status(201).json({
                    message: 'saved Event'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "unsaveEvent", async (req, res, next)=>{
            try {
                const { EventID, UserID } = req.query;
                await this.e.unsaveEvent(Number(EventID), Number(UserID));
                res.status(201).json({
                    message: 'unsaved Event'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "filtered", async (req, res, next)=>{
            try {
                const { q, search } = req.query;
                if (q === 'all' || q === 'popular' || q === 'recent' || q === 'name' || q === 'old') {
                    const filteredEvents = await this.e.filtered(q, String(search));
                    res.status(201).json({
                        data: filteredEvents,
                        message: 'filtered Events'
                    });
                } else {
                    res.status(400).json({
                        message: 'Invalid query parameter'
                    });
                }
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "create", async (req, res, next)=>{
            try {
                const { Title, Description, Date, Location, CreatorID } = req.body;
                const newEvent = await this.e.create(Title, Description, Date, Location, Number(CreatorID));
                res.status(201).json({
                    data: newEvent,
                    message: 'created Event'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=events.controller.js.map