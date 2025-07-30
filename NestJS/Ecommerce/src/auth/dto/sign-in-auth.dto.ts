import {IsString, IsEmail, IsNotEmpty, MinLength} from 'class-validator'

export class SignInAuthDto {
    @IsNotEmpty()
    @IsEmail()
    username: string
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}
