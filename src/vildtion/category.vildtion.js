import Joi from "joi";

const addCategoriesVildtion = Joi.object({
  title :Joi.string().required(),
})

export {
  addCategoriesVildtion
}