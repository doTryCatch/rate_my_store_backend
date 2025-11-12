import { Router } from "express";
import { isAdmin } from "../middleware/validOperationBasedOnRole";
import { CreateStore } from "../controllers/storeController";

const router = Router();
router.post("/create", isAdmin, CreateStore);

export default router;
