import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDTO = (anyDTO: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(anyDTO, req.body);
    const isValid = await validate(dtoObject as object);
    if (isValid.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: isValid.map((err) => err.constraints),
      });
    }
    next();
  };
};
