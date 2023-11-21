"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QuestionRoute", {
    enumerable: true,
    get: function() {
        return QuestionRoute;
    }
});
const _questionscontroller = require("../controllers/questions.controller");
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
let QuestionRoute = class QuestionRoute {
    initializeRoutes() {
        this.router.get(`${this.path}getAllQuestions`, this.questions.getAll);
        this.router.post(`${this.path}likeQuestion`, this.questions.likeQuestion);
        this.router.post(`${this.path}unlikeQuestion`, this.questions.unlikeQuestion);
        this.router.post(`${this.path}saveQuestion`, this.questions.saveQuestion);
        this.router.post(`${this.path}unsaveQuestion`, this.questions.unsaveQuestion);
        this.router.get(`${this.path}getAllWithFilter`, this.questions.filtered);
        this.router.post(`${this.path}create`, this.questions.create);
        this.router.get(`${this.path}getOne`, this.questions.getOne);
    }
    constructor(){
        _define_property(this, "path", '/questions/');
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "questions", new _questionscontroller.QuestionsController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=questions.route.js.map