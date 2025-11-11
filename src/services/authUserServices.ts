import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { LoginUserDto, RegisterUserDto } from "../dto/user.dto";
import { generateToken } from "../utils/handleJWT";

class AuthUserServices {
  async register(data: RegisterUserDto) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
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
    if (!user) throw new Error("User not found");
    const isPasswordMatch = bcrypt.compare(user?.password, data.password);
    if (!isPasswordMatch) throw new Error("Invalid Password!");
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }
}
const authUserServices = new AuthUserServices();
export default authUserServices;
