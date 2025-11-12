import { Router } from "express";
import authUserRoute from "./authUserRoute";
import storeRoute from "./storeRoute";
import ratingRoute from "./ratingRoute";
const router = Router();
router.use("/auth", authUserRoute);
router.use("/store", storeRoute);
router.use("/rating", ratingRoute);

export default router;
