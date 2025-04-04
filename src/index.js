import dotenv from "dotenv";
import connectDB from "./db/index.js";

//first step : give access environment variable to all files by doing it in index file

dotenv.config({
  path: "./env",
});

//second Step : connect DB
connectDB();
