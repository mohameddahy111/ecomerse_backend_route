import express from "express";
import { addCategoriesVildtion, updateCategoriesVildtion } from "../vildtion/category.vildtion.js";
import { vilditor } from "../middleware/validitor.js";
import { adminAuth } from "../middleware/auth/adminAuth.js";
import subCategoryRouter from './subCategory.model.js';
import {
  addCategories,
  getAllCategories,
  updateCategories,
  deleteCategory
} from "../controller/category.controller.js";
import { cloudImage } from "../middleware/cloudnery/uploadImages.js";

const router = express.Router();
router.use('/category/:categoryId/subCategory/' ,subCategoryRouter )
router.get("/category", getAllCategories);
router.post(
  "/category",
  adminAuth,
  cloudImage().single("image"),
  vilditor(addCategoriesVildtion),
  addCategories
);
router.put(
  "/category/:id",
  adminAuth,
  cloudImage().single("image"),
  vilditor(updateCategoriesVildtion),
  updateCategories
);
router.delete(
  "/category/:id",
  adminAuth,
  deleteCategory
);

export default router;
