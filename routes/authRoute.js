import express from "express";
import { signUp, signIn } from "../controllers/authController.js";
import runValidation from "../validators/index.js";
import userSignupValidator from "../validators/auth.js";
const router = express.Router();

router.route("/signUp").post(userSignupValidator, runValidation, signUp);
router.route("/signIn").post(signIn);

export default router;
