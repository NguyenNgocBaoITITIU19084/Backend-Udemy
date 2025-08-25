import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import * as argon from 'argon2';

import { UserService } from 'src/user/user.service';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthRegisterInputDto } from './dto/auth-register-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY) private readonly refreshJwtOptions: ConfigType<typeof refreshJwtConfig>
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    return {id: user.id};
  }

  async login(userId: number) {
    const {access_token, refresh_token} = await this.generateToken(userId);
    
    const hashedRefreshToken = await argon.hash(refresh_token);

    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {access_token, refresh_token};
  }

  async logout(userId: number) {
    return await this.userService.removeRefreshToken(userId);
  }

  async register(body: AuthRegisterInputDto) {
    const user = await this.userService.findByUsername(body.username);
    
    if (user) throw new BadRequestException('Username already exists');
    
    const newUser = await this.userService.create(body);

    return newUser;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken) throw new UnauthorizedException('User not found');

    const isRefreshTokenValid = await argon.verify(user.hashedRefreshToken, refreshToken);
    if (!isRefreshTokenValid) throw new UnauthorizedException('Invalid refresh token');

    return {id: user.id};
  }

  async refreshToken(userId: number) {
    const {access_token, refresh_token} = await this.generateToken(userId);
    
    const hashedRefreshToken = await argon.hash(refresh_token);

    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {access_token, refresh_token};
  }

  async generateToken(userId: number) {
    const payload = { sub: userId };
    const access_token =  await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, this.refreshJwtOptions);
    return {access_token, refresh_token}
  }

}
