import { Request, Response } from "express";
import authUserServices from "../services/authUserServices";
export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const response = await authUserServices.register(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const LoginUser = (req: Request, res: Response) => {};
