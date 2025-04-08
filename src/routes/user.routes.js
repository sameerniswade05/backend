import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

function fun(req, res) {
  console.log("fun", req.body);
  res.status(200).json(new ApiResponse(200, "", "working"));
}

router.route("/register").post(
  upload.fields([
    //adding middleware from multer to uplode files
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser // calling this function to register user
);

router.route("/login").post(loginUser);

//secure routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("refresh-token").post(refreshAccessToken);
export default router;
