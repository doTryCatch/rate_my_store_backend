import prisma from "../config/prisma";
import { RatingDTO } from "../dto/rating.dto";

class RatingServices {
  async add(data: RatingDTO) {
    const res = await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId: data.userId,
          storeId: data.storeId,
        },
      },
      update: {
        value: data.value,
        updatedAt: new Date(),
      },
      create: {
        value: data.value,
        userId: data.userId,
        storeId: data.storeId,
      },
    });

    return res;
  }
}
export const ratingServices = new RatingServices();
