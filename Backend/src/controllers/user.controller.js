import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

/////////////////////////HelperFunctions///////////////////////////
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("////", error);
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
//---------------------------------------------------------------//
const registerUser = asyncHandler(async (req, res) => {
  const { fname, lname, username, email, password } = req.body;
  console.log(req.body);
  //checking that user is already registerd on database
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  //encrypting password
  const encryptedPassword = await bcrypt.hash(password, 10);

  //getting profile image path by multer middleware
  let profileLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.profile) &&
    req.files.profile.length > 0
  ) {
    profileLocalPath = req.files.profile[0].path;
  }

  //uploading profile on cloudinary
  const profile = await uploadOnCloudinary(profileLocalPath);

  //checking that cloudinary give back public url
  if (!profile?.url) {
    throw new ApiError(400, "profilePublicUrl is required");
  }

  //creating user document in mongoDB atlas
  const user = await User.create({
    fname,
    lname,
    username,
    email,
    password: encryptedPassword,
    profile: profile.url,
  });

  const createdUser = await User.findById(user._id).select("-password");
  //checking user is succesfully created on database
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  //response send back to user of frontend
  res.send(JSON.stringify(createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("/////////////////", email, password);
  //serching for use in database
  const recivedUser = await User.findOne({ email });
  if (!recivedUser) {
    throw new ApiError(404, "user not found you are not registerd");
  }

  //comparing user given password and database password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    recivedUser.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(404, "Incorrect Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    recivedUser._id
  );

  const loggedInUser = await User.findById(recivedUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      accessToken,
      refreshToken,
    });
});
export { registerUser, loginUser };
