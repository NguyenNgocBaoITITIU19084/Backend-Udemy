import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}