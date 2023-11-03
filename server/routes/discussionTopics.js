import express from "express";
import * as topics from "../controllers/discussionTopics.controller.js";
var router = express.Router();

router.get("/discussionTopic/getAll", topics.getAllTopics);
router.post("/discussionTopic/like", topics.likeTopic);
router.post("/discussionTopic/unlike", topics.unlikeTopic);
router.post("/discussionTopic/save", topics.saveTopic);
router.post("/discussionTopic/unsave", topics.unsaveTopic);
router.get("/discussionTopic/getAllWithFilter", topics.getTopicsWithFilter);

export default router;
