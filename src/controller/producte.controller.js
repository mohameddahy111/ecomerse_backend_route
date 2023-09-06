import slugify from "slugify";
import Producte from "../schema/producte.schema.js";
import { AppError } from "../utils/AppError.js";
import { addImage } from "../utils/handler/addImage.js";
import { handlerError } from "../utils/handlerError.js";
import cloudinary from "../utils/cloudinery.js";
//------------------------------add Productes----------------------------------//
export const addProductes = handlerError(async (req, res, next) => {
  const { title } = req.body;
  const isExist = await Producte.find({ title });
  if (isExist.length > 0)
    return next(new AppError("this title is already used"));
  req.body.slug = slugify(title);
  req.body.min_image = await addImage({
    type: "array",
    path: req.files.min_image,
    folder: `${process.env.CLOUD_NAME_FOLDER}/productes/${req.body.slug}`,
  });
  req.body.images = await addImage({
    type: "array",
    path: req.files.images,
    folder: `${process.env.CLOUD_NAME_FOLDER}/productes/${req.body.slug}`,
  });
  req.body.createBy = req.adminId;
  req.body.updateBy = req.adminId;
  await Producte.insertMany(req.body);
  res.status(201).send({ message: "Success add product" });
});

//------------------------------get All Productes----------------------------------//

export const getAllProductes = handlerError(async (req, res, next) => {
  const productes = await Producte.find();
  res.status(200).send(productes);
});

//------------------------------------update producte --------------------------------------------------------------//
export const updateProductes = handlerError(async (req, res, next) => {
  const { title } = req.body;
  const { id } = req.params;
  const findProduct = await Producte.findById(id);
  if (!findProduct) return next(new AppError("this producte not isExist"), 404);
  if (findProduct.title != title) {
    const isExist = await Producte.find({ title });
    if (isExist.length > 0)
      return next(new AppError("this title is already used",409));
  }
  req.body.slug = slugify(title);
  if (req.files.min_image) {
    await cloudinary.uploader.destroy(`${findProduct.min_image.id}`);
  }
  if (req.files.images) {
    findProduct.images.map(async (x) => {
      await cloudinary.uploader.destroy(`${x.id}`);
    });
  }
  req.body.min_image = req.files.min_image
    ? await addImage({
        type: "array",
        path: req.files.min_image,
        folder: `${process.env.CLOUD_NAME_FOLDER}/productes/${req.body.slug}`,
      })
    : findProduct.min_image;
  req.body.images = req.files.images
    ? await addImage({
        type: "array",
        path: req.files.images,
        folder: `${process.env.CLOUD_NAME_FOLDER}/productes/${req.body.slug}`,
      })
    : findProduct.images;
  req.body.createBy = req.adminId;
  req.body.updateBy = req.adminId;
  await Producte.findByIdAndUpdate({ _id: id }, req.body);
  res.status(200).send({ message: "Success update product" });
});

//---------------------------------delete ptoduct-------------------------------//
export const deleteProduct = handlerError(async (req, res, next) => {
  const { ids } = req.body;
  await ids?.map(async (id) => {
    const findProduct = await Producte.findById(id);
    if (!findProduct) return next(new AppError(`product with id ${id} not found`,404));
      const deleteArry = [].concat(findProduct.min_image.id);
      findProduct.images.map(async (img) => {
        deleteArry.push(img.id);
      });
      deleteArry.map(async (delImg) => {
        await cloudinary.uploader.destroy(delImg);
      });
      res.status(200).send({message :'Success delete products'})
    });
});

//----------------------------------------------------------------//