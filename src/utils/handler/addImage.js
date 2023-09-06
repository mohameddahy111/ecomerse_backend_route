import cloudinary from "../cloudinery.js"

 export const addImage = async(options)=>{
  if (!options.path)  return '' 
  if (options.type === 'array') {
    const array = []
    for (const file of options.path) {
      const {secure_url , public_id} = await cloudinary.uploader.upload(file.path , {folder :options.folder})
      array.push({id :public_id , url:secure_url})
    }
    return array.length>1 ?array :{id:array[0].id , url :array[0].url}
    
  } else {
    const {secure_url , public_id} = await cloudinary.uploader.upload(options.path , {folder :options.folder})
    return {id:public_id, url:secure_url}
    
  }
    

}