import express from "express";
import {
  create,
  getTags,
  readTag,
  removeTag,
} from "../controllers/tagController.js";

import runValidation from "../validators/index.js";
import { tagCreateValidator } from "../validators/tag.js";
import {
  adminMiddleware,
  requireSignin,
} from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/tag",
  tagCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
router.get("/tags", getTags);
router.get("/tag/:slug", readTag);
router.delete("/tag/:slug", requireSignin, adminMiddleware, removeTag);

export default router;
