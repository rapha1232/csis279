import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import listingsRouter from "./routes/listings.js";
import { signin, logout, signup } from "./routes/auth.js";
import session from "express-session";
const app = express();

app.use(
  session({
    secret: "cSHUl|rPef1SgvR-#zNN*6#DGs/l|/%/_2?4&({Edd:BZ9DQ[l]pDkJmvb$u%}3", // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, // 2 hours (in milliseconds)
    },
  })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "Ok from the server side" });
});

app.post("/sign-in", signin);
app.post("/sign-up", signup);
app.post("/logout", logout);
// app.use("/api/auth", auth);

// Use the listings router for handling file uploads
app.use("/listings", listingsRouter);

app.listen(process.env.APP_PORT || 3001, () => {
  console.log("Working");
});

export { app };