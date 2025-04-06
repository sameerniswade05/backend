import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // passing this function to asyncHandler and receving function wrap in try catch block

  const { email, fullname, username, password } = req.body;

  if (
    [email, fullname, username, password].some((field) => field?.trim() === "") //to find any empty field
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existUser = User.findOne({
    // to check user email or username exit or not
    $or: [{ username }, { email }], // user is comming from mongoose model
  });

  if (existUser) {
    throw new ApiError(409, "User with same email or username Id exist");
  }

  const avatarLocalPath = req.files?.avtar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (avatar) {
    throw new ApiError(400, "avatar image is required");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong on registed user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User register successfully "));
});

export { registerUser };
