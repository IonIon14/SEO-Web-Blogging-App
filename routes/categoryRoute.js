import express from "express";
import {
  create,
  getCategories,
  readCategory,
  removeCategory,
} from "../controllers/categoryController.js";

import runValidation from "../validators/index.js";
import { categoryCreateValidator } from "../validators/category.js";
import {
  adminMiddleware,
  requireSignin,
} from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
router.get("/categories", getCategories);
router.get("/category/:slug", readCategory);
router.delete(
  "/category/:slug",
  requireSignin,
  adminMiddleware,
  removeCategory
);

export default router;
