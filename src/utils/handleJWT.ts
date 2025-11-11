import jwt from "jsonwebtoken";
import { userInfo } from "../dto/user.dto";
export const generateToken = (data: userInfo) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1h",
  });
  return token;
};
