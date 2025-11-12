import { storeServices } from "../services/storeServices";
import { Response, Request } from "express";

export const CreateStore = async (req: Request, res: Response) => {
  try {
    const response = await storeServices.create(req.body);
    console.log(response);
    if (!response) return res.status(401).json(response);

    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Login failed: Internal Server Error", error });
  }
};
