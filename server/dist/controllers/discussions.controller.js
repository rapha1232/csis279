"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DiscussionsController", {
    enumerable: true,
    get: function() {
        return DiscussionsController;
    }
});
const _typedi = require("typedi");
const _discussionsservice = require("../services/discussions.service");
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
let DiscussionsController = class DiscussionsController {
    constructor(){
        _define_property(this, "d", _typedi.Container.get(_discussionsservice.DiscussionsService));
        _define_property(this, "getAll", async (req, res, next)=>{
            try {
                const allTopics = await this.d.getAll();
                res.status(201).json({
                    data: allTopics,
                    message: 'get All Topics'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "likeTopic", async (req, res, next)=>{
            try {
                const { TopicID, UserID } = req.query;
                await this.d.likeTopic(Number(TopicID), Number(UserID));
                res.status(201).json({
                    message: 'liked Topic'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "unlikeTopic", async (req, res, next)=>{
            try {
                const { TopicID, UserID } = req.query;
                await this.d.unlikeTopic(Number(TopicID), Number(UserID));
                res.status(201).json({
                    message: 'unliked Topic'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "saveTopic", async (req, res, next)=>{
            try {
                const { TopicID, UserID } = req.query;
                await this.d.saveTopic(Number(TopicID), Number(UserID));
                res.status(201).json({
                    message: 'saved Topic'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "unsaveTopic", async (req, res, next)=>{
            try {
                const { TopicID, UserID } = req.query;
                await this.d.unsaveTopic(Number(TopicID), Number(UserID));
                res.status(201).json({
                    message: 'unsaved Topic'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "filtered", async (req, res, next)=>{
            try {
                const { q, search } = req.query;
                if (q === 'all' || q === 'popular' || q === 'recent' || q === 'name' || q === 'old') {
                    const filteredTopics = await this.d.filtered(q, String(search));
                    res.status(201).json({
                        data: filteredTopics,
                        message: 'filtered Topics'
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
                const { Title, Content, CreatedAt, CreatorID } = req.body;
                const newTopic = await this.d.create(Title, Content, CreatedAt, Number(CreatorID));
                res.status(201).json({
                    data: newTopic,
                    message: 'created Topic'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getOne", async (req, res, next)=>{
            try {
                const { TopicID } = req.query;
                const q = await this.d.getOne(Number(TopicID));
                res.status(201).json({
                    data: q,
                    message: 'getOne Topic'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=discussions.controller.js.map