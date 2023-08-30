import express from "express";
import { adminAuth } from "../middleware/auth/adminAuth.js";
import { vilditor } from "../middleware/validitor.js";
import { addSubCategoryValidtion } from "../vildtion/subCategory.vaildtion.js";
import { cloudImage } from "../middleware/cloudnery/uploadImages.js";
import { addSubCategory ,deleteSubCategory,getAllSubCategories, updateSubCategory } from "../controller/subCategory.controller.js";

const router = express.Router({mergeParams: true});
router.post(
  "/",
  adminAuth,
  cloudImage().single('sub_image'),
  vilditor(addSubCategoryValidtion),
  addSubCategory
);
router.put(
  "/:id",
  adminAuth,
  cloudImage().single('sub_image'),
  vilditor(addSubCategoryValidtion),
  updateSubCategory
);
router.get('/'  , getAllSubCategories)
router.delete('/',adminAuth  , deleteSubCategory)
export default router;
