import { Router } from "express";
import {
  GetAllUsers,
  LoginUser,
  logout,
  RegisterUser,
  UpdateUser,
} from "../controllers/userController";
import { validateDTO } from "../middleware/dto.validator";
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from "../dto/user.dto";
import { verifyToken } from "../utils/handleJWT";

const router = Router();
router.post("/login", validateDTO(LoginUserDto), LoginUser);
router.post("/register", validateDTO(RegisterUserDto), RegisterUser);
router.get("/getAllUsers", verifyToken, GetAllUsers);
router.get("/logout", logout);
router.post("/updateUser", validateDTO(UpdateUserDto), UpdateUser);

router.get("/me", verifyToken, (req, res) => {
  res.json(req.user);
});
export default router;
