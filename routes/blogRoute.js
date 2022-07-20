import express from "express";
const router = express.Router();
import {
  create,
  getBlogs,
  getBlog,
  removeBlog,
  getBlogsCategoriesTags,
  updateBlog,
} from "../controllers/blogController.js";

import {
  adminMiddleware,
  requireSignin,
} from "../controllers/authController.js";

router.post("/blog", requireSignin, adminMiddleware, create);
router.get("/blogs", getBlogs);
router.post("/blogs-categories-tags", getBlogsCategoriesTags);
router.get("/blog/:slug", getBlog);
router.delete("/blog/:slug", requireSignin, adminMiddleware, removeBlog);
router.put("/blog/:slug", requireSignin, adminMiddleware, updateBlog);

export default router;
