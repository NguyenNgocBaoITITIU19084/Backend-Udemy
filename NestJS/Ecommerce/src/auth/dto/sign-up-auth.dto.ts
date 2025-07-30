import {IsString, IsEmail, IsNotEmpty, MinLength} from 'class-validator'

export class SignUpAuthDto  {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string
}
