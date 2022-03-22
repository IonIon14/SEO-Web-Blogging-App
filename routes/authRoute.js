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

//test

router.get("/secret", requireSignin, (req, res) => {
  res.json({
    message: "you have access to secret page",
  });
});

export default router;
