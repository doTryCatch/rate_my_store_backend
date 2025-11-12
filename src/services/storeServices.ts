import prisma from "../config/prisma";
import { StoreCreateDTO } from "../dto/store.dto";

class StoreServices {
  async create(data: StoreCreateDTO) {
    const res = prisma.store.create({
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
      },
    });
    return res;
  }
}
export const storeServices = new StoreServices();
