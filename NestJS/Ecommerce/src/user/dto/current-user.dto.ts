import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator'

export class CurrentUserDto {
    @IsNumber()
    id: number  
  
    @IsNotEmpty()
    @IsEmail()
    username: string
}
