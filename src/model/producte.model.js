import express from "express";
import { adminAuth } from "../middleware/auth/adminAuth.js";
import { cloudImage } from "../middleware/cloudnery/uploadImages.js";
import { vilditor } from "../middleware/validitor.js";
import { addProdectVaildtion, deleteProdectVaildtion } from "../vildtion/productes.vaildtion.js";
import { addProductes , deleteProduct, getAllProductes, updateProductes } from "../controller/producte.controller.js";
const router = express.Router();
router.get("/", getAllProductes);
router.post(
  "/",
  adminAuth,
  cloudImage().fields([
    { name: "min_image", maxCount: 1 , },
    { name: "images", maxCount: 4 },
  ]),
  vilditor(addProdectVaildtion)
  ,
  addProductes
);
router.patch(
  "/:id",
  adminAuth,
  cloudImage().fields([
    { name: "min_image", maxCount: 1 , },
    { name: "images", maxCount: 4 },
  ]),
  vilditor(addProdectVaildtion)
  ,
  updateProductes
);
router.delete('/' ,adminAuth, vilditor(deleteProdectVaildtion), deleteProduct);

export default router;
