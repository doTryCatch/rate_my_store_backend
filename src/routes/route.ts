import { Router } from "express";
import authUserRoute from "./authUserRoute";
const route = Router();
route.use("/auth", authUserRoute);
export default route;
