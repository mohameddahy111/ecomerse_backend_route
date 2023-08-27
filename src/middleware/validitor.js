import { AppError } from "../utils/AppError.js"

export const vilditor = (schema)=>{
return (req , res , next )=>{
const data = {...req.body , ...req.query ,...req.params}
let {error} = schema.validate(data ,  {abortEarly: false})
if (!error) {
  next()
} else {
  next(new  AppError(`${error.message}` , 400))
}
}


}