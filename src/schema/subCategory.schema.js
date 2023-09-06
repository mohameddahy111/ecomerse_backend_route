import mongoose , {Types} from "mongoose";

const subCategory = new mongoose.Schema({
  title :{type : String , required: true, unique: true },
  sub_image :{type : Object },
  categoryId :{type :Types.ObjectId , ref :'category'}, 
  createdBy:{type :Types.ObjectId , ref :'user'},
  updatedBy:{type :Types.ObjectId , ref :'user'},
  slug:{type : String, required: true },


},{timestamps :true})

subCategory.virtual('brands' , {
  ref:'brand',
  localField:'_id',
  foreignField:"subCategoryId"
})


const SubCategory = mongoose.model('subcategory' ,subCategory )
export default SubCategory
