import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RequestAuthDto } from './dto/request-login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';

import { ResponseInterceptor } from '../interceptor/response.interceptor'
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseInterceptor(ResponseLoginDto)
  async register(@Body() input: RequestAuthDto) {
    return await this.authService.register(input)
  }

  @Post('login')
  @ResponseInterceptor(ResponseLoginDto)
  async login(@Body() input: RequestAuthDto) {
    return await this.authService.login(input)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getCurrentUser() {
    return await this.authService.getCurrentUser()
  }
}
