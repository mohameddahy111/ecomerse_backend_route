import multer , {diskStorage} from "multer"

 export const cloudImage =  ()=>{
const storage = diskStorage({})
const multerUpload = multer({storage})
return multerUpload
 }