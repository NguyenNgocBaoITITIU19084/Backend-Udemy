import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt"

import { UserService } from 'src/user/user.service';
import { RequestAuthDto } from './dto/request-login.dto';

import { compareAsync } from 'src/utils/hashString';

@Injectable()
export class AuthService {
  constructor
  (
    private readonly userService: UserService, 
    private readonly jwtService: JwtService
  ) {}

  async register(input: RequestAuthDto) {
    return this.userService.create(input)
  }

  async login(input: RequestAuthDto) {
    const {username, password} = input
    const existingUser = await this.userService.validateUser(username)

    if(!existingUser) {
      throw new UnauthorizedException("wrong username or password")
    }

    const isValidPassword = await compareAsync(password, existingUser.password)

    if(!isValidPassword){
      throw new UnauthorizedException("wrong username or password")
    }
    const payload = { sub: existingUser.id, username: existingUser.username };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getCurrentUser(){
    return "working..."
  }
}
