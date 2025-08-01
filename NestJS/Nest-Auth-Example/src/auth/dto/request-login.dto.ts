import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class RequestAuthDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}