import { Router } from "express";

import { validateDTO } from "../middleware/dto.validator";
import { RatingDTO } from "../dto/rating.dto";
import { AddRating } from "../controllers/ratingController";

const router = Router();
router.post("/add", validateDTO(RatingDTO), AddRating);

export default router;
