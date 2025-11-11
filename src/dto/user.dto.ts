import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  STORE_OWNER = "STORE_OWNER",
}

export class RegisterUserDto {
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(16, { message: "Password must not exceed 16 characters" })
  password!: string;

  @IsString()
  @MinLength(20, { message: "Name must be at least 20 characters long" })
  @MaxLength(60, { message: "Name must not exceed 60 characters" })
  name!: string;

  @IsString()
  @MaxLength(400, { message: "Address must not exceed 400 characters" })
  address!: string;

  @IsOptional()
  @IsEnum(Role, { message: "Role must be ADMIN, USER, or STORE_OWNER" })
  role?: Role;
}

export class LoginUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(60)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password?: string;
}

export interface userInfo {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "STORE_OWNER";
}
