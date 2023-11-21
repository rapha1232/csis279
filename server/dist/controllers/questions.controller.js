"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QuestionsController", {
    enumerable: true,
    get: function() {
        return QuestionsController;
    }
});
const _typedi = require("typedi");
const _questionsservice = require("../services/questions.service");
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
let QuestionsController = class QuestionsController {
    constructor(){
        _define_property(this, "d", _typedi.Container.get(_questionsservice.QuestionsService));
        _define_property(this, "getAll", async (req, res, next)=>{
            try {
                const allQuestions = await this.d.getAll();
                res.status(201).json({
                    data: allQuestions,
                    message: 'get All Questions'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "likeQuestion", async (req, res, next)=>{
            try {
                const { QuestionID, UserID } = req.query;
                await this.d.likeQuestion(Number(QuestionID), Number(UserID));
                res.status(201).json({
                    message: 'liked Question'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "unlikeQuestion", async (req, res, next)=>{
            try {
                const { QuestionID, UserID } = req.query;
                await this.d.unlikeQuestion(Number(QuestionID), Number(UserID));
                res.status(201).json({
                    message: 'unliked Question'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "saveQuestion", async (req, res, next)=>{
            try {
                const { QuestionID, UserID } = req.query;
                await this.d.saveQuestion(Number(QuestionID), Number(UserID));
                res.status(201).json({
                    message: 'saved Question'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "unsaveQuestion", async (req, res, next)=>{
            try {
                const { QuestionID, UserID } = req.query;
                await this.d.unsaveQuestion(Number(QuestionID), Number(UserID));
                res.status(201).json({
                    message: 'unsaved Question'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "filtered", async (req, res, next)=>{
            try {
                const { q, search } = req.query;
                if (q === 'all' || q === 'popular' || q === 'recent' || q === 'name' || q === 'old') {
                    const filteredQuestions = await this.d.filtered(q, String(search));
                    res.status(201).json({
                        data: filteredQuestions,
                        message: 'filtered Questions'
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
                const newQuestion = await this.d.create(Title, Content, CreatedAt, Number(CreatorID));
                res.status(201).json({
                    data: newQuestion,
                    message: 'created Question'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getOne", async (req, res, next)=>{
            try {
                const { QuestionID } = req.query;
                const q = await this.d.getOne(Number(QuestionID));
                res.status(201).json({
                    data: q,
                    message: 'getOne Question'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=questions.controller.js.map