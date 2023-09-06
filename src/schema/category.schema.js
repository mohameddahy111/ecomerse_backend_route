import mongoose , {Types} from "mongoose";

const categorySchema = new mongoose.Schema({
  title :{type : String , required: true, unique: true },
  image :{type : Object },
  createdBy:{type :Types.ObjectId , ref :'user'},
  updatedBy:{type :Types.ObjectId , ref :'user'},
  slug:{type : String, required: true },


},{timestamps :true  ,toJSON:{virtuals :true} ,toObject:{virtuals :true} })


categorySchema.virtual('subCategory', {
  ref :'subcategory',
  localField:"_id",
  foreignField:"categoryId"
})

const Category = mongoose.model('category' , categorySchema)
export default Category