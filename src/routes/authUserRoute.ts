import { Request, Response, Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/userController";
import { validateDTO } from "../middleware/dto.validator";
import { RegisterUserDto } from "../dto/user.dto";

const route = Router();
route.get("/login", LoginUser);
route.post("/register", validateDTO(RegisterUserDto), RegisterUser);
export default route;
