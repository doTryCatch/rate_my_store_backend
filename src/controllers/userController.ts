import { Request, Response } from "express";
import authUserServices from "../services/authUserServices";
export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const response = await authUserServices.register(req.body);
    if (!response?.success) return res.status(401).json(response.msg);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: "User registration failed: Internal Server Error",
      error,
    });
  }
};
export const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await authUserServices.getAllUsers();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: "User registration failed: Internal Server Error",
      error,
    });
  }
};
export const LoginUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const response = await authUserServices.login(req.body);
    console.log(response);
    if (!response.success) return res.status(401).json(response);
    // to allow browser set cookies after login
    res.cookie("rate_my_store_token", response.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Login failed: Internal Server Error", error });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("rate_my_store_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to clear cookie: Internal Server Error",
      error,
    });
  }
};
export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const response = await authUserServices.updateUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: "User data updation failed: Internal Server Error",
      error,
    });
  }
};
