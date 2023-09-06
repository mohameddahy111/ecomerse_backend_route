import slugify from "slugify";
import Category from "../schema/category.schema.js";
import { AppError } from "../utils/AppError.js";
import { handlerError } from "../utils/handlerError.js";
import { addImage } from "../utils/handler/addImage.js";
import cloudinary from "../utils/cloudinery.js";

//----------------------------get All Categories------------------------------------//
export const getAllCategories = handlerError(async (req, res, next) => {
  const categories = await Category.find().populate("subCategory" ,{title :1});
  res.status(200).send(categories);
});
// ----------------------------Add Categories------------------------------------------//
export const addCategories = handlerError(async (req, res, next) => {
  const { title } = req.body;
  const isExiest = await Category.find({ title });
  if (isExiest.length > 0) {
    return next(new AppError("this category already exists", 409));
  }
  const slug = slugify(title)
  const img = await addImage({
    type: "",
    path: req.file?.path,
    folder: `${process.env.CLOUD_NAME_FOLDER}/category`,
  });
  await Category.insertMany({
    title,
    image: img,
    slug,
    createdBy: req.adminId,
    updatedBy: req.adminId,
  });
  res.status(201).send({ message: "category added successfully" });
});
//--------------------------------update Categories--------------------------------//
export const updateCategories = handlerError(
  async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;
    const category = await Category.findById(id);
    if (category.title != title) {
      const oldCategory = await Category.findOne({ title });
      if (oldCategory) {
        return next(new AppError("this category already exists", 409));
      }
    }
    const slug = slugify(title)
    if (req.file) {
      await cloudinary.uploader.destroy(category.image.id)
      
    }
    const img = await addImage({
      type: "",
      path: req.file?.path,
      folder: `${process.env.CLOUD_NAME_FOLDER}/category`,
    });
    await Category.findByIdAndUpdate(
      { _id: id },
      {
        title,
        slug,
        image: img ? img : category.image,
        updatedBy: req.adminId,
      }
    );
    res.status(200).send({ message: "category updated successfully updated" });
  },
  { new: true }
);
//--------------------------------delete Category--------------------------------//
export const deleteCategory = handlerError(async (req, res, next) => {
  const { id } = req.params;
  const deleteCategory = await Category.findOneAndDelete(id);
  if (!deleteCategory) {
    return next(new AppError("this category does not exist", 404));
  }
  res.status(200).send({ message: "category deleted successfully" });
});
