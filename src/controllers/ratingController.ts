import { ratingServices } from "../services/ratingServices";
import { Response, Request } from "express";

export const AddRating = async (req: Request, res: Response) => {
  try {
    const response = await ratingServices.add(req.body);
    console.log(response);
    if (!response) return res.status(401).json(response);

    return res
      .status(200)
      .json({ msg: "Rating Added successfully", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Rating failed: Internal Server Error", error });
  }
};
