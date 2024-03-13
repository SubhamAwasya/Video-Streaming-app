import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logOut,
  logInWithAccessToken,
  getUsersById,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getVideos, getVideoById } from "../controllers/video.controller.js";
import {
  createNewComment,
  getComment,
} from "../controllers/comment.controllers.js";

const userRouter = Router();
const videoRouter = Router();
const commentRouter = Router();

//User Routes
userRouter.route("/register").post(
  upload.fields([
    {
      name: "profile",
      maxCount: 1,
    },
  ]),
  registerUser
);
userRouter.route("/get-users-by-id").get(getUsersById);
userRouter.route("/login").post(loginUser);
userRouter.route("/refreshAccessToken").post(refreshAccessToken);
// Protected rout User Routes
userRouter.route("/logout").post(verifyJwt, logOut);
userRouter.route("/tokenlogin").post(verifyJwt, logInWithAccessToken);

//Video Routes
videoRouter.route("/get-home-videos").get(getVideos);
videoRouter.route("/get-video-by-id").get(getVideoById);

//Comments Routes
commentRouter.route("/get-comments").get(getComment);
commentRouter.route("/create-new-comment").post(createNewComment);

export { userRouter, videoRouter, commentRouter };
