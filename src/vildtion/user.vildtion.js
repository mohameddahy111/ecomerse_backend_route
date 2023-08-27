import Joi from "joi";

const userSignupVildtion = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(11).required(),
  password: Joi.string().required(),
  _isAdmin: Joi.boolean(),
  _isBlocked: Joi.boolean(),
}).options({ allowUnknown: true });

export { userSignupVildtion };
