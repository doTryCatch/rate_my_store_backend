import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDTO = (anyDTO: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(anyDTO, req.body);

    const isValid = await validate(dtoObject);

    const validationMsg = isValid.map((err) => err.constraints)[0];
    console.log(validationMsg);

    if (validationMsg) {
      const firstMsg = Object.values(validationMsg)[0];
      return res.status(401).json({
        msg: `Validation failed: ${firstMsg}`,
        errors: validationMsg,
      });
    }
    next();
  };
};
