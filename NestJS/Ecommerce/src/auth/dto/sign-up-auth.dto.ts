import {IsString, IsEmail, IsNotEmpty, MinLength} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class SignUpAuthDto  {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

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
