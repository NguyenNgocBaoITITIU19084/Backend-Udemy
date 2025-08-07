import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';

import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';

import { compareAsync } from 'src/_utils/hash';
import { generateJWT } from '../_utils/jwt'

@Injectable()
export class AuthService {
  constructor( private usersService: UserService, private jwtService: JwtService ) {}
  async signUp(signUpDto: SignUpAuthDto) {
    // 1 create a user
    // 2 hash password
    // 3 save to db

    const existingUser = await this.usersService.findOne(signUpDto.username)

    if(existingUser) throw new BadRequestException("email is in use")

    const user = await this.usersService.create(signUpDto)
    // generate access token 

    return await generateJWT(user.id, user.username, this.jwtService) 
  }

  async signIn(signInDto: SignInAuthDto) {
    const existingUser = await this.usersService.findOne(signInDto.username)

    // find user
    if(!existingUser) throw new UnauthorizedException()

    // compare password
    const isValidPassword = await compareAsync(signInDto.password, existingUser.password)

    if(!isValidPassword) throw new UnauthorizedException()

    return await generateJWT(existingUser.id, existingUser.username, this.jwtService) 
  }
}
