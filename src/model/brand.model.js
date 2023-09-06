import express from "express";
import { adminAuth } from "../middleware/auth/adminAuth.js";
import { cloudImage } from "../middleware/cloudnery/uploadImages.js";
import { vilditor } from "../middleware/validitor.js";
import { addBrand } from "../vildtion/brand.vaildtion.js";
import { addNewBrand, getAllBrands } from "../controller/brand.controller.js";

const router = express.Router();
router.post(
  "/brand",
  adminAuth,
  cloudImage().single("brand_image"),
  vilditor(addBrand),
  addNewBrand
);
router.get('/brand' ,getAllBrands )

export default router;
