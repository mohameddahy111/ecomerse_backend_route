import Joi from "joi";

const addBrand = Joi.object({
  title :Joi.string().min(2).required(),
  categoryId:Joi.string().hex().required(),
  subCategoryId:Joi.string().hex().required()
})

export {
  addBrand
}