import slugify from "slugify";
import Brand from "../schema/brand.schema.js";
import { AppError } from "../utils/AppError.js";
import { handlerError } from "../utils/handlerError.js";
import cloudinary from "../utils/cloudinery.js";
import { addImage } from "../utils/handler/addImage.js";

//----------------------------add New Brand------------------------------------//
export const addNewBrand = handlerError(async (req, res, next) => {
  const { title, categoryId, subCategoryId } = req.body;
  const isExist = await Brand.find({ title });
  if (isExist.length > 0)return next(new AppError("this title  is already use"), 409);
  const slug = slugify(title)

    const img = await addImage({
      type: "",
      path: req.file?.path,
      folder: `${process.env.CLOUD_NAME_FOLDER}/brands`,
    });
    await Brand.insertMany({ 
    title,
    brand_image: img ,
    categoryId: req.adminId,
    updatedBy: req.adminId,categoryId, subCategoryId,slug
  });
  res.status(201).send({message :'Success adding new brand'})
});

//----------------------------get all Brands------------------------------------//
export const getAllBrands = handlerError(async(req , res , next)=>{
  const brands  = await Brand.find()
  res.status(200).send(brands)
})
//----------------------------update brand--------------------------------//
export const updateBrand = handlerError(async(req , res , next)=>{
  const { title, categoryId, subCategoryId } = req.body;
const { id } = req.params;
const findBrand  = await Brand.findOne(id)
if (findBrand && findBrand.title !== title) {
  const isExist  = await Brand.find()
  if (isExist.length>0) return next(new AppError('this title is already used'),409)
}
const slug = slugify(title)
if (req.file) {
  await cloudinary.uploader.destroy(findBrand.brand_image.id)
  
}
const img = await addImage({
  type: "",
  path: req.file?.path,
  folder: `${process.env.CLOUD_NAME_FOLDER}/brands`,
});
await Brand.findByIdAndUpdate({_id:id},{ 
  title,
  brand_image: img?img :findBrand.brand_image ,
  updatedBy: req.adminId,categoryId, subCategoryId,slug
});
res.status(201).send({message :'Success adding new brand'})


})