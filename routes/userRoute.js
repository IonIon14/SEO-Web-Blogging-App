import express from "express";
import {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} from "../controllers/authController.js";

import { read } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", requireSignin, authMiddleware, read);

export default router;
