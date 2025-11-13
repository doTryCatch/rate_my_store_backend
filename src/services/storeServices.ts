import prisma from "../config/prisma";
import { StoreCreateDTO } from "../dto/store.dto";
import authUserServices from "./authUserServices";

class StoreServices {
  async create(data: StoreCreateDTO) {
    //if user already exist with same email then update the role to STORE_OWNER
    const isEmailUser = await prisma.store.findUnique({
      where: { email: data.email },
    });
    if (isEmailUser) return { msg: "Email Already taken !" };
    const isUserExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    console.log("is user", isUserExists);
    if (isUserExists) {
      const result = await prisma.$transaction([
        prisma.user.update({
          where: { email: data.email },
          data: { role: "STORE_OWNER" },
        }),
        prisma.store.create({
          data: {
            name: data.name,
            email: data.email,
            address: data.address,
          },
        }),
      ]);

      // returning only store
      return result[1];
    }
    const res = await prisma.store.create({
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
      },
    });
    console.log("res", res);
    return res;
  }
  async getUserStore(email: string) {
    const res = await prisma.store.findMany({
      where: {
        email,
      },
      include: {
        ratings: true,
      },
    });

    return res.map((store: any) => {
      const ratings = store.ratings ?? [];

      const avg =
        ratings.length > 0
          ? ratings.reduce(
              (sum: number, data: any) => sum + Number(data.value),
              0
            ) / ratings.length
          : 0;

      return {
        ...store,
        averageRating: avg,
      };
    });
  }
  async getAllStore() {
    const res = await prisma.store.findMany({
      include: {
        ratings: {
          select: {
            value: true,
            userId: true,
            storeId: true,
          },
        },
      },
    });
    return res.map((store: any) => {
      const ratings = store.ratings ?? [];

      const avg =
        ratings.length > 0
          ? ratings.reduce(
              (sum: number, data: any) => sum + Number(data.value),
              0
            ) / ratings.length
          : 0;

      return {
        ...store,
        averageRating: avg,
      };
    });
  }
}
export const storeServices = new StoreServices();
