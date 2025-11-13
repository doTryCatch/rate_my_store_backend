import jwt from "jsonwebtoken";
import { userInfo } from "../dto/user.dto";
import { NextFunction, Request, Response } from "express";
//add user property into express as global, later to access req.user in needed
declare global {
  namespace Express {
    interface Request {
      user?: userInfo;
    }
  }
}
export const generateToken = (data: userInfo) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "10m",
  });
  return token;
};
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies["rate_my_store_token"];
  if (!cookie)
    return res.status(401).json("token is either expired or missing!");
  try {
    const isValidToken = jwt.verify(
      cookie,
      process.env.JWT_SECRET_KEY as string
    );
    req.user = isValidToken as userInfo;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
