import {
  IsNegative,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

export class RatingDTO {
  @IsNumber()
  @Min(1, { message: "Rating cannot be less than 1" })
  value!: number;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  storeId!: string;
}
