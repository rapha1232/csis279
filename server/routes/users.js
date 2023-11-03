import express from "express";
import * as users from "../controllers/users.controller.js";
var router = express.Router();

router.get("/users/getUserInfo", users.getUserInfo);
router.get("/users/getSaved", users.getUserSaved);

export default router;
