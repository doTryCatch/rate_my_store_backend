import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../dto/user.dto";
import { generateToken } from "../utils/handleJWT";

class AuthUserServices {
  async register(data: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        address: data.address,
        role: data.role,
      },
    });
    return user;
  }
  async login(data: LoginUserDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user)
      return {
        success: false,
        msg: "User associated with email not found!",
      };

    const isPasswordMatch = await bcrypt.compare(data.password, user?.password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch)
      return {
        success: false,
        msg: "incorrect password!",
      };
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return { success: true, user, token };
  }
}
const authUserServices = new AuthUserServices();
export default authUserServices;
