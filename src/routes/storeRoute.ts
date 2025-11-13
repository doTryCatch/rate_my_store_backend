import { Router } from "express";
import { isAdmin } from "../middleware/validOperationBasedOnRole";
import {
  CreateStore,
  GetAllStores,
  GetUserStores,
} from "../controllers/storeController";
import { verifyToken } from "../utils/handleJWT";
import { validateDTO } from "../middleware/dto.validator";
import { GetUserStoresDTO, StoreCreateDTO } from "../dto/store.dto";

const router = Router();
router.post(
  "/create",
  validateDTO(StoreCreateDTO),
  verifyToken,
  isAdmin,
  CreateStore
);
router.get("/getAllStores", verifyToken, GetAllStores);
router.get("/getUserStores", verifyToken, GetUserStores);
export default router;
