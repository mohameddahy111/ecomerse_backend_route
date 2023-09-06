import User from "../../schema/user.schema.js";
import { AppError } from "../../utils/AppError.js";
import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  const userToken = req.headers["authorization"];
  if (!userToken || (userToken && !userToken.includes("Bearer"))) {
    return next(new AppError("token is required"), 400);
  }

  const token = userToken.split(" ")[1];
  jwt.verify(token, process.env.USER_TOKEN, async (err, decoded) => {
    if (err) {
      return next(new AppError("Error verifying token", 402));
    }
    const admin = await User.findById(decoded.id);
    if (admin?._isAdmin == true) {
      req.adminId = decoded.id;
      next();
    } else {
      return next(new AppError("admin only available", 403));
    }
  });
};
