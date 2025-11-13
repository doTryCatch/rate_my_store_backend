import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from "class-validator";

export class StoreCreateDTO {
  @IsString()
  @MaxLength(60, { message: "Name must not exceed 60 characters" })
  @MinLength(20, { message: "Name must be at least 20 characters long" })
  @IsNotEmpty({ message: "Name must not be empty" })
  name!: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email must not be empty" })
  email!: string;

  @IsString()
  @MaxLength(400, { message: "Address must not exceed 400 characters" })
  @IsNotEmpty({ message: "Adress must not be empty" })
  address!: string;
}
export class GetUserStoresDTO {
  @IsEmail()
  email!: string;
}
