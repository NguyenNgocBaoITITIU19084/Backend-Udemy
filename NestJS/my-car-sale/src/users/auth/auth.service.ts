import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from "bcryptjs";

import {UsersService} from '../users.service'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const existingUser = await this.userService.find(email);

    if (existingUser.length) {
      throw new BadRequestException('Email in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.userService.createUser(email, hash);

    return user;
  }

  async signin(email: string, password: string) {
    const existingUser = await this.userService.find(email);

    if (!existingUser.length) {
      throw new BadRequestException('Email is not registered');
    }

    const user = existingUser[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return user
  }
}
