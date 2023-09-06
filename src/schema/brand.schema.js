import mongoose, { Types } from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    brand_image: { type: Object },
    categoryId:{type:Types.ObjectId ,ref:'category' },
    subCategoryId:{type:Types.ObjectId ,ref:'subcategory' },
    createdBy: { type: Types.ObjectId, ref: "user" },
    updatedBy: { type: Types.ObjectId, ref: "user" },
    slug:{type : String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Brand = mongoose.model("brand", brandSchema);
export default Brand;
