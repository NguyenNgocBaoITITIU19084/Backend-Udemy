import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RequestLoginDto } from './dto/request-login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';

import { ResponseInterceptor } from '../interceptor/response.interceptor'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ResponseInterceptor(ResponseLoginDto)
  async login(@Body() input: RequestLoginDto): Promise<ResponseLoginDto> {
    return await this.authService.validationUser(input)
  }
}
