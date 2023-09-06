import Joi from "joi";

export const addProdectVaildtion = Joi.object({
  title :Joi.string().min(2).required(),
  sub_title :Joi.string(),
  descrption :Joi.string(),
  statue:Joi.boolean(),
  offer:Joi.boolean(),
  _isShowe:Joi.boolean(),
  quantity:Joi.number(),
  stock:Joi.number(),
  item_sell:Joi.number(),
  price:Joi.number(),
  offer_value:Joi.number(),
  category:Joi.string().hex().required(),
  subCategory:Joi.string().hex().required(),
  brand:Joi.string().hex().required(),
}).options({allowUnknown:true});

export const deleteProdectVaildtion = Joi.object({
  ids : Joi.array().min(1).required()
}).options({allowUnknown:true});