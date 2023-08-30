import SubCategory from "../schema/subCategory.schema.js";
import { AppError } from "../utils/AppError.js";
import cloudinary from "../utils/cloudinery.js";
import { handlerError } from "../utils/handlerError.js";


//----------------------------add SubCategory------------------------------------//
export const addSubCategory = handlerError(async (req, res, next) => {
  const { title} = req.body;
  const {categoryId } =req.params
  const isExist = await SubCategory.find({ title });
  if (isExist.length > 0) {
    return next(new AppError("this subcategory already exists"),409);
  }
  const img = await cloudinary.uploader.upload(req.file.path);
  await SubCategory.insertMany({
    title,
    sub_image: img ? img.secure_url : "",
    categoryId,
    createdBy: req.adminId,
    updatedBy: req.adminId,
  });
  res.status(201).send('Successfully added  subcategory')
});
//-------------------------get All SubCategories-------------------------// 

export const getAllSubCategories  = handlerError(async(req ,res ,next)=>{
  const subCategories = await SubCategory.find().populate([{path :'categoryId' ,populate:"createdBy" } ,{path :'createdBy' }])
  res.status(200).send(subCategories)
}) 
//-------------------------delete SubCategory---------------------------//
export const deleteSubCategory = handlerError(async(req, res ,next)=>{
const {id} =req.pramas
const category =  await SubCategory.findByIdAndDelete(id)
if (category) {
  res.status(200).send('Successfully deleted category')
}
next(new AppError('this subcategory is not isExist'),404)
})
//------------------------ update SubCategory----------------------------//

export const updateSubCategory = handlerError(async(req , res , next)=>{
  const { title, categoryId } = req.body;
  const {id} =req.pramas
  const findCategory = await SubCategory.findById(id)
  if (findCategory && findCategory.title != title) {
    const isExist = await SubCategory.find({title})
    if (isExist.length>0) {
      return next(new AppError("this subcategory already exists"),409);
    }
  }
  const img  = req.file ? await cloudinary.uploader.upload(req.file.path):null
 await SubCategory.findByIdAndUpdate({_id:id} , {
    title,
    image :img? img.secure_url:findCategory.image,
    categoryId
  })
res.status(200).send('Successfully updated')
})