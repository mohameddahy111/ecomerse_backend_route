import User from "../schema/user.schema.js";
import { handlerError } from "../utils/handlerError.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";

export const userSignup = handlerError(async (req, res, next) => {
  const { email, password, phone, name } = req.body;
  const isExist = await User.findOne({ email: email });
  if (isExist) {
    return next(new AppError("this email already exists"));
  }
  const hashPassword = bcrypt.hashSync(password, +process.env.SALTROUNDS);
  await User.insertMany({
    email,
    password: hashPassword,
    phone,
    name,
  });
  res.status(201).send({message : 'success'});
});
