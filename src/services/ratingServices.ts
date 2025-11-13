import prisma from "../config/prisma";
import { RatingDTO } from "../dto/rating.dto";

class RatingServices {
  async add(data: RatingDTO) {
    const res = prisma.rating.create({
      data,
    });
    return res;
  }
}
export const ratingServices = new RatingServices();
