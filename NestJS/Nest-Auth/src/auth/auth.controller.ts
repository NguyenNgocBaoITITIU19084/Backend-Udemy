import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthLoginInputDto } from './dto/auth-login-input.dto';
import { AuthService } from './auth.service';
import { AuthTokenOutputDto } from './dto/auth-token-output.dto';
import { RefreshJwtAuthGuard } from './guard/refresh-auth.guard';
import { AuthRegisterInputDto } from './dto/auth-register-input.dto';
import { Interceptor } from 'src/interceptor/interceptor';
import { AuthRegisterOutputDto } from './dto/auth-register-output.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User Login API' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged in successfully', type: AuthTokenOutputDto})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() body: AuthLoginInputDto): Promise<AuthTokenOutputDto>{
     const token = await this.authService.login(req.user.id);
     return {id: req.user.id, ...token};
  }

  @ApiOperation({ summary: 'User Logout API' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged out successfully', type: AuthTokenOutputDto})
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.id);
    return {message: 'Logout successful' };
  }

  @ApiOperation({ summary: 'User Re-fresh token API' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Re-fresh token successfully', type: AuthTokenOutputDto})
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req): Promise<AuthTokenOutputDto> {
    const token = await this.authService.refreshToken(req.user.id);
    return {id: req.user.id, ...token};
  }

  @ApiOperation({ summary: 'Register account API' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Register account successfully', type: AuthTokenOutputDto})
  @Interceptor(AuthRegisterOutputDto)
  @Post('register')
  async register(@Body() body: AuthRegisterInputDto): Promise<AuthRegisterOutputDto> {
    return await this.authService.register(body);
  }
 
}
