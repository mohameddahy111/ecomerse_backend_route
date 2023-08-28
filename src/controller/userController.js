import User from "../schema/user.schema.js";
import { handlerError } from "../utils/handlerError.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';




//-----------------------------GET ALL USERS-----------------------------------//
export const allUsers = handlerError(async(req , res ,next)=>{
  const users  = await User.find()
  res.status(200).send(users)
})

//---------------------------- sign_up ------------------------------------//
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
    owner :email
  });
  res.status(201).send({message : 'success'});
});
//---------------------------- sign_in ------------------------------------//
export const  login  = handlerError(async(req,res ,next )=>{
  const { email, password} = req.body;
  const findUser = await User.findOne({ email: email})
  if (!findUser) {
   return next(new AppError("this email not found" , 404));
  }
  const match = bcrypt.compareSync(password, findUser.password)
  if (!match) {
    return next(new AppError("password mismatch" ,404))
  }
  const token = jwt.sign({id : findUser._id  , owner:findUser.owner} , process.env.USER_TOKEN)
  res.status(200).send({token })

})

//----------------------------update User Profile--------------------------------//
export const updateUserProfile = handlerError(async(req , res ,next)=>{
  const { email, password, phone, name } = req.body;
  const user = await User.findById(req.userId)
  if (user.email !== email){
    const isExist = await User.findOne({ email: email})
    if (isExist) {
      return next(new AppError(" this email is already in use" , 409));   
    }
  }

const hashPassword =password ? bcrypt.hashSync(password , +process.env.SALTROUNDS):null;
const findUser = await User.findByIdAndUpdate({_id : req.userId} , {
  name , password :hashPassword?hashPassword:user.password , email , phone
},{new:true})
res.status(200).send({message :'success update' })
})
//-------------------------------delete user ---------------------------------//
export const deleteUser =  handlerError(async (req , res , next)=>{
  const {id  } = req.params;
  const user = await User.findByIdAndDelete({_id : id})
if (!user) {
  return next(new AppError(' this user not found' , 404));
}
res.status(200).send({message :'success delete user'}) 
})


