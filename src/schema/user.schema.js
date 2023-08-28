import mongoose from "mongoose";

const userSchame = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  owner : { type: String,},
  phone: { type: Number, required: true, unique: true },
  _isAdmin: { type: Boolean, default: false },
  _isBlocked: { type: Boolean, default: false },
  _isVerify :{ type: Boolean, default: false}
});
const User = mongoose.model('user', userSchame);
export default User