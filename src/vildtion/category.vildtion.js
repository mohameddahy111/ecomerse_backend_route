import Joi from "joi";

const addCategoriesVildtion = Joi.object({
  title :Joi.string().required(),
});
const updateCategoriesVildtion = Joi.object({
  title :Joi.string().required(),
  id :Joi.string().hex().required()
});
 
export {
  addCategoriesVildtion,updateCategoriesVildtion
}