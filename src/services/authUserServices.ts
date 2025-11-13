import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { Response } from "express";
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from "../dto/user.dto";
import { generateToken } from "../utils/handleJWT";

class AuthUserServices {
  async register(data: RegisterUserDto) {
    //check if email already exist or not
    const isEmailAlreadyExist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (isEmailAlreadyExist)
      return { success: false, msg: "Email already in use!" };
    const isStoreOwner = await prisma.store.findFirst({
      where: { email: data.email },
    });
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        address: data.address,
        role: isStoreOwner ? "STORE_OWNER" : data.role,
      },
    });
    return { success: true, data: user };
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
      address: user.address,
    });

    return { success: true, user, token };
  }
  async getAllUsers() {
    const res = await prisma.user.findMany({});
    return res;
  }
  async updateUser(data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    return await prisma.user.update({
      where: { email: data.email },
      data,
    });
  }
}
const authUserServices = new AuthUserServices();
export default authUserServices;
