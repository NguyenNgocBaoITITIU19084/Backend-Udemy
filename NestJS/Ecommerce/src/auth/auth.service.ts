import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';

import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';

@Injectable()
export class AuthService {
  constructor( private usersService: UserService, private jwtService: JwtService ) {}
  async signUp(createAuthDto: SignUpAuthDto) {
    // 1 create a user
    // 2 hash password
    // 3 save to db

    const existingUser = await this.usersService.findOne(createAuthDto.username)

    if(existingUser) {
      throw new BadRequestException("email is in use")
    }

    const user = await this.usersService.create(createAuthDto)
    // generate access token 

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: SignInAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
