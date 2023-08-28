import Joi from "joi";

const userSignupVildtion = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(11).required(),
  password: Joi.string().required(),
  _isAdmin: Joi.boolean(),
  _isBlocked: Joi.boolean(),
}).options({ allowUnknown: true });

const userupdateVildtion = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.number().min(11),
  password: Joi.string(),
  _isAdmin: Joi.boolean(),
  _isBlocked: Joi.boolean(),
}).options({ allowUnknown: true });

const userLoginVildtion = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),

})

export { userSignupVildtion ,userLoginVildtion  ,userupdateVildtion};
