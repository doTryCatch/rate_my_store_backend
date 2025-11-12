import prisma from "../config/prisma";
import { RatingDTO } from "../dto/rating.dto";

class RatingServices {
  async add(data: RatingDTO) {
    const res = prisma.rating.create({
      data: {
        value: data.value,
        userId: data.userId,
        storeId: data.storeId,
      },
    });
    return res;
  }
}
export const ratingServices = new RatingServices();
