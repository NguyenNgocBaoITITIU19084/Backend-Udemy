import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() createAuthDto: SignUpAuthDto) {
    const access_token =  await this.authService.signUp(createAuthDto)
    return {
      access_token,
      data: []
    }
  }

 @Post('signin')
 @HttpCode(200)
  async signIn(@Body() signInDto: SignInAuthDto) {
    const access_token =  await this.authService.signIn(signInDto)
     return {
      access_token,
      data: []
    }
  }

}
