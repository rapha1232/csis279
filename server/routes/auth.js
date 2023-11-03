import express from "express";
var router = express.Router();
import * as auth from "../controllers/auth.controller.js";

router.post("/auth/sign-in", auth.signin);
router.post("/auth/sign-up", auth.signup);
router.post("/auth/sign-out", auth.signout);

export default router;
