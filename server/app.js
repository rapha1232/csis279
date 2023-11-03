import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import eventRouter from "./routes/events.js";
import discussionTopicsRouter from "./routes/discussionTopics.js";
const app = express();

app.use(
  session({
    secret: "cSHUl|rPef1SgvR-#zNN*6#DGs/l|/%/_2?4&({Edd:BZ9DQ[l]pDkJmvb$u%}3",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRouter);
app.use(userRouter);
app.use(eventRouter);
app.use(discussionTopicsRouter);

app.listen(process.env.APP_PORT || 3001, () => {
  console.log(`Working on ${process.env.APP_PORT || 3001}`);
});
