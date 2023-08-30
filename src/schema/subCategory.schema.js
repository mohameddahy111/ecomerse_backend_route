import mongoose , {Types} from "mongoose";

const subCategory = new mongoose.Schema({
  title :{type : String , required: true, unique: true },
  sub_image :{type : String },

  categoryId :{type :Types.ObjectId , ref :'category'}, 
  createdBy:{type :Types.ObjectId , ref :'user'},
  updatedBy:{type :Types.ObjectId , ref :'user'},

},{timestamps :true})


const SubCategory = mongoose.model('subcategory' ,subCategory )
export default SubCategory
