import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logOut,
  logInWithAccessToken,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profile",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/refreshAccessToken").post(refreshAccessToken);

// protected rout
router.route("/logout").post(verifyJwt, logOut);
router.route("/tokenlogin").post(verifyJwt, logInWithAccessToken);

export default router;
