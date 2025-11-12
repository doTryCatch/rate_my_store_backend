import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class StoreCreateDTO {
  @IsString()
  @MinLength(20, { message: "Name must be at least 20 characters long" })
  @MaxLength(60, { message: "Name must not exceed 60 characters" })
  name!: string;

  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsString()
  @MaxLength(400, { message: "Address must not exceed 400 characters" })
  address!: string;
}
