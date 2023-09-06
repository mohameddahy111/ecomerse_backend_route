import mongoose from "mongoose";

const producteSchema = new mongoose.Schema(
  {
    //-------------------------------String----------------------------------//
    title: { type: String, required: true, unique: true },
    sub_title: { type: String },
    slug: { type: String, required: true, unique: true },
    descrption: { type: String },
    // ---------------------------Boolean-------------------------------------
    statue: { type: Boolean, default: true },
    offer: { type: Boolean, default: false },
    _isShowe: { type: Boolean, default: false },
    // ---------------------------Numbers-------------------------------------
    quantity: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    item_sell: { type: Number, default: 0 },
    price: { type: Number, default: 0, required: true },
    offer_value: { type: Number, default: 0 },
    // ----------------------------Object------------------------------------//
    min_image: { type: Object },
    images: { type: [Object] },
    //-----------------------------ObjectId-----------------------------------//
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "category",
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "subcategory",
    },
    brand: { type: mongoose.Types.ObjectId, required: true, ref: "brand" },
    createBy: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    updateBy: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// producteSchema.virtual(
  
  // parseFloat(this.price - (this.price * this.offer_value) / 100).toFixed(2)
// );
const Producte = mongoose.model("Product", producteSchema);
export default Producte;
