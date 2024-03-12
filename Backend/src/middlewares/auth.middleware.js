import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    console.log(req.cookies);
    if (!token) {
      res.status(401).send({ message: "Un anauthorized request" });
      return new ApiError(404, "Un anauthorized request");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(498).send({ message: "Invalid access token" });
      return new ApiError(404, "Invalid access token");
    }

    req.user = user;
  } catch (error) {
    console.log(error);
  }
  next();
});
