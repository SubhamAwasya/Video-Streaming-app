import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logOut,
} from "../controllers/user.controller.js";

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
router.route("/logout").post(logOut);
router.route("/refreshAccessToken").post(refreshAccessToken);

export default router;
