import Joi from "joi";

const addSubCategoryValidtion = Joi.object({
  title :Joi.string().required(),
  categoryId :Joi.string().hex().required()
})
export{
  addSubCategoryValidtion
}