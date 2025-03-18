import { verifyToken } from "../services/jwt-service.js";
import User from "../models/User.js";

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = verifyToken(token);

    if (user) {
      req.user = await User.findById(user.id).exec();
      console.log(req.user)
      next();
    } else {
      throw new Error();
    }

  } catch (error) {
    res.sendStatus(401);
  }
};