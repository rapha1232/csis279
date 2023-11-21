"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = require("./app");
const _authroute = require("./routes/auth.route");
const _usersroute = require("./routes/users.route");
const _validateEnv = require("./utils/validateEnv");
const _discussionsroute = require("./routes/discussions.route");
const _eventsroute = require("./routes/events.route");
const _questionsroute = require("./routes/questions.route");
const _repliesroute = require("./routes/replies.route");
(0, _validateEnv.ValidateEnv)();
const app = new _app.App([
    new _usersroute.UserRoute(),
    new _authroute.AuthRoute(),
    new _eventsroute.EventsRoute(),
    new _discussionsroute.DiscussionsRoute(),
    new _questionsroute.QuestionRoute(),
    new _repliesroute.RepliesRoute()
]);
app.listen();

//# sourceMappingURL=server.js.map