import express from "express";
var router = express.Router();
import * as event from "../controllers/events.controller.js";

router.get("/events/getAll", event.getAllEvents);
router.post("/events/like", event.likeEvent);
router.post("/events/unlike", event.unlikeEvent);
router.post("/events/save", event.saveEvent);
router.post("/events/unsave", event.unsaveEvent);
router.get("/events/getAllWithFilter", event.getEventsWithFilter);

export default router;
