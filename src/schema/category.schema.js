import mongoose , {Types} from "mongoose";

const categorySchema = new mongoose.Schema({
  title :{type : String , required: true, unique: true },
  image :{type : String },
  createdBy:{type :Types.ObjectId , ref :'user'},
  updatedBy:{type :Types.ObjectId , ref :'user'},

},{timestamps :true  ,toJSON:{virtuals :true} ,toObject:{virtuals :true} })


categorySchema.virtual('subCategory', {
  ref :'subcategory',
  localField:"_id",
  foreignField:"categoryId"
})

const Category = mongoose.model('category' , categorySchema)
export default Category