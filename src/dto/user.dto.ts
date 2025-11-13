import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from "class-validator";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  STORE_OWNER = "STORE_OWNER",
}

export class RegisterUserDto {
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email must not be empty" })
  email!: string;

  @IsString()
  @MaxLength(16, { message: "Password must not exceed 16 characters" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password!: string;

  @IsString()
  @MaxLength(60, { message: "Name must not exceed 60 characters" })
  @MinLength(20, { message: "Name must be at least 20 characters long" })
  @IsNotEmpty({ message: "Name must not be empty" })
  name!: string;

  @IsString()
  @MaxLength(400, { message: "Address must not exceed 400 characters" })
  @IsNotEmpty({ message: "Address must not be empty" })
  address!: string;

  @IsOptional()
  @IsEnum(Role, { message: "Role must be ADMIN, USER, or STORE_OWNER" })
  role?: Role;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty({ message: "Email must not be empty" })
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password!: string;
}

export class UpdateUserDto {
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email must not be empty" })
  email?: string;
  @IsOptional()
  @IsString()
  @MaxLength(60, { message: "Name must not exceed 60 characters" })
  @MinLength(20, { message: "Name must be at least 20 characters long" })
  @IsNotEmpty({ message: "Name must not be empty" })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16, { message: "Password must not exceed 16 characters" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password?: string;

  @IsOptional()
  @IsEnum(Role, { message: "Role must be ADMIN, USER, or STORE_OWNER" })
  role?: Role;
}

export interface userInfo {
  id: string;
  name: string;
  email: string;
  address: string;
  role: "ADMIN" | "USER" | "STORE_OWNER";
}
