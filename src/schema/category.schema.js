import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title :{type : String , required: true, unique: true },
  image :{type : String },

})


const Category = mongoose.model('category' , categorySchema)
export default Category