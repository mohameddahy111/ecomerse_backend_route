import slugify from "slugify";
import SubCategory from "../schema/subCategory.schema.js";
import { AppError } from "../utils/AppError.js";
import { addImage } from "../utils/handler/addImage.js";
import { handlerError } from "../utils/handlerError.js";
import cloudinary from "../utils/cloudinery.js";

//----------------------------add SubCategory------------------------------------//
export const addSubCategory = handlerError(async (req, res, next) => {
  const { title } = req.body;
  const { categoryId } = req.params;
  const isExist = await SubCategory.find({ title });
  if (isExist.length > 0) {
    return next(new AppError("this subcategory already exists"), 409);
  }
  const slug = slugify(title);
  const img = await addImage({
    type: "",
    path: req.file?.path,
    folder: `${process.env.CLOUD_NAME_FOLDER}/subcategories`,
  });
  await SubCategory.insertMany({
    title,
    sub_image: img,
    slug,
    categoryId,
    createdBy: req.adminId,
    updatedBy: req.adminId,
  });
  res.status(201).send("Successfully added  subcategory");
});
//-------------------------get All SubCategories-------------------------//

export const getAllSubCategories = handlerError(async (req, res, next) => {
  const subCategories = await SubCategory.find().populate([
    {
      path: "categoryId",
      select: "title",
      populate: { path: "createdBy", select: "name" },
    },
    { path: "createdBy", select: "name" },
  ]);
  res.status(200).send(subCategories);
});
//-------------------------delete SubCategory---------------------------//
export const deleteSubCategory = handlerError(async (req, res, next) => {
  const { id } = req.pramas;
  const category = await SubCategory.findByIdAndDelete(id);
  if (category) {
    res.status(200).send("Successfully deleted category");
  }
  next(new AppError("this subcategory is not isExist"), 404);
});
//------------------------ update SubCategory----------------------------//

export const updateSubCategory = handlerError(async (req, res, next) => {
  const { title, categoryId } = req.body;
  const { id } = req.pramas;
  const findCategory = await SubCategory.findById(id);
  if (findCategory && findCategory.title != title) {
    const isExist = await SubCategory.find({ title });
    if (isExist.length > 0) {
      return next(new AppError("this subcategory already exists"), 409);
    }
  }
  const slug = slugify(title);
  if (req.file) {
    await cloudinary.uploader.destroy(findCategory.sub_image.id);
  }
  const img = await addImage({
    type: "",
    path: req.file?.path,
    folder: `${process.env.CLOUD_NAME_FOLDER}/subcategories`,
  });

  await SubCategory.findByIdAndUpdate(
    { _id: id },
    {
      title,
      slug,
      sub_image: img ? img : findCategory.image,
      categoryId,
    }
  );
  res.status(200).send("Successfully updated");
});
