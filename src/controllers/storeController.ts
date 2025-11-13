import { storeServices } from "../services/storeServices";
import { Response, Request } from "express";

export const CreateStore = async (req: Request, res: Response) => {
  try {
    const response = await storeServices.create(req.body);
    console.log(response);

    if (!response) return res.status(401).json(response);

    return res
      .status(200)
      .json({ msg: "store created successfully", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Store Entry failed: Internal Server Error", error });
  }
};
export const GetAllStores = async (req: Request, res: Response) => {
  try {
    const response = await storeServices.getAllStore();

    if (!response) return res.status(401).json(response);

    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetch Stores failed: Internal Server Error", error });
  }
};
export const GetUserStores = async (req: Request, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({ msg: "User email not matched!" });
    const response = await storeServices.getUserStore(req.user.email);

    if (!response) return res.status(401).json(response);

    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetch Users failed: Internal Server Error", error });
  }
};
