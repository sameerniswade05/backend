import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
//first step : give access environment variable to all files by doing it in index file

dotenv.config({
  path: "./env",
});

//second Step : connect DB and make server
connectDB()
  .then(() => {
    try {
      const server = app.listen(process.env.PORT || 8000, () => {
        console.log("App is listing on PORT::", process.env.PORT);
      });

      server.on("error", (error) => {
        console.error("ERROR: Server error:", error);
      });
    } catch (error) {
      console.log("ERROR : There is problem in express", error);
    }
  })
  .catch((error) => {
    console.log("ERROR :: DB connection fail", error);
  });
