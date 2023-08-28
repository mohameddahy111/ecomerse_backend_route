import Category from "../schema/category.schema.js";
import { handlerError } from "../utils/handlerError.js";


//----------------------------get All Categories------------------------------------//
export const getAllCategories  = handlerError(async(req , res , next)=>{
  const categories = await Category.find()
  res.status(200).send( categories)
})
// ----------------------------Add Categories--------------------------------//
export const addCategories = handlerError(async(req , res , next)=>{
  
})