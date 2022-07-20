import express from "express";
import {
  signUp,
  signIn,
  signOut,
  requireSignin,
} from "../controllers/authController.js";
import runValidation from "../validators/index.js";
import {
  userSignInValidator,
  userSignupValidator,
} from "../validators/auth.js";
const router = express.Router();

router.route("/signUp").post(userSignupValidator, runValidation, signUp);
router.route("/signIn").post(userSignInValidator, runValidation, signIn);
router.get("/signOut", signOut);

export default router;
