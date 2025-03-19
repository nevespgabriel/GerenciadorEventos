import { verifyToken } from "../services/jwt-service.js";
import db from "../models/index.js";
const { Users } = db;

export default async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    const user = verifyToken(token);
    
    if (user) {
      req.user = user;
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};
