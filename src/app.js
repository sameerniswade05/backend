import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, //allow only from origin
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // to get data in the form of json with 16kb limit
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to get data in the form of url with nested object allow
app.use(express.static("public")); // to put all the static data like image or any row things put into the public folder
app.use(cookieParser()); // to do curd operation on the cookies

export default app;
