import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsEmail, IsNotEmpty, MinLength} from 'class-validator'

export class SignInAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    username: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}
