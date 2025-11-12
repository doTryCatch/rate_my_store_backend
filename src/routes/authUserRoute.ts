import { Router } from "express";
import { LoginUser, logout, RegisterUser } from "../controllers/userController";
import { validateDTO } from "../middleware/dto.validator";
import { LoginUserDto, RegisterUserDto } from "../dto/user.dto";
import { verifyToken } from "../utils/handleJWT";

const router = Router();
router.post("/login", validateDTO(LoginUserDto), LoginUser);
router.post("/register", validateDTO(RegisterUserDto), RegisterUser);
router.get("/logout", logout);

router.get("/me", verifyToken, (req, res) => {
  res.json(req.user);
});
export default router;
