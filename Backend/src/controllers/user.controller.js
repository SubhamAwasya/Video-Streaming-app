import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
};

/////////////////////////HelperFunctions///////////////////////////
const generateAccessAndRefreshTokens = async (userId) => {
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
    res.status(409).send({ message: "You Already registerd" });
    throw new ApiError(409, "User with email already exists");
  }

  //encrypting password
  const encryptedPassword = await bcrypt.hash(password, 2);

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
  res
    .status(200)
    .send(JSON.stringify({ ...createdUser, message: "Sucessfull Registerd." }));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //serching for use in database
  const recivedUser = await User.findOne({ email });
  if (!recivedUser) {
    res.status(404).send({ message: "Email is not registerd" });
    throw new ApiError(404, "user not found you are not registerd");
  }

  //comparing user given password and database password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    recivedUser.password
  );

  if (!isPasswordCorrect) {
    res.send({ message: "Incorrect Password" });
    throw new ApiError(404, "Incorrect Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    recivedUser._id
  );

  const loggedInUser = await User.findById(recivedUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      message: "Succefully LogedIn",
      accessToken,
      refreshToken,
    });
});

const logOut = asyncHandler(async (req, res) => {});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req?.cookies?.refreshToken;

  try {
    if (!incomingRefreshToken) {
      res.send({ message: "No refresh token" });
      return new ApiError(404, "No refresh token");
    }

    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      res.send({ message: "In valid refresh token" });
      return new ApiError(404, "In valid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      res.send({ message: "Token is expired or used" });
      return new ApiError(404, "Token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user,
        message: "Toke refreshed",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Someting went wrong!" });
  }
});

export { registerUser, loginUser, refreshAccessToken, logOut };
