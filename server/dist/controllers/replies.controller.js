"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RepliesController", {
    enumerable: true,
    get: function() {
        return RepliesController;
    }
});
const _repliesservice = require("../services/replies.service");
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
let RepliesController = class RepliesController {
    constructor(){
        _define_property(this, "r", _typedi.Container.get(_repliesservice.RepliesService));
        _define_property(this, "getAll", async (req, res, next)=>{
            const { QuestionID } = req.query;
            try {
                const allReplies = await this.r.getAll(Number(QuestionID));
                res.status(201).json({
                    data: allReplies,
                    message: 'get All Replies'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "likeReply", async (req, res, next)=>{
            try {
                const { ReplyID, UserID } = req.query;
                await this.r.likeReply(Number(ReplyID), Number(UserID));
                res.status(201).json({
                    message: 'liked Reply'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "unlikeReply", async (req, res, next)=>{
            try {
                const { ReplyID, UserID } = req.query;
                await this.r.unlikeReply(Number(ReplyID), Number(UserID));
                res.status(201).json({
                    message: 'unliked Reply'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "filtered", async (req, res, next)=>{
            try {
                const { q, QuestionID } = req.query;
                if (q === 'all' || q === 'popular' || q === 'recent' || q === 'name' || q === 'old') {
                    const filteredReplies = await this.r.filtered(q, Number(QuestionID));
                    res.status(201).json({
                        data: filteredReplies,
                        message: 'filtered Replies'
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
        _define_property(this, "createQuestionReply", async (req, res, next)=>{
            try {
                const { Content, CreatedAt, CreatorID, QuestionID } = req.body;
                const newReply = await this.r.createQuestionReply(Content, CreatedAt, Number(CreatorID), Number(QuestionID));
                res.status(201).json({
                    data: newReply,
                    message: 'created Reply'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "createTopicReply", async (req, res, next)=>{
            try {
                const { Content, CreatedAt, CreatorID, TopicID } = req.body;
                const newReply = await this.r.createTopicReply(Content, CreatedAt, Number(CreatorID), Number(TopicID));
                res.status(201).json({
                    data: newReply,
                    message: 'created Reply'
                });
            } catch (error) {
                res.send(error);
                next(error);
            }
        });
    }
};

//# sourceMappingURL=replies.controller.js.map