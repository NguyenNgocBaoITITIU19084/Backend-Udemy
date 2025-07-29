import { Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { RequestLoginDto } from './dto/request-login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validationUser(input: RequestLoginDto): Promise<ResponseLoginDto> {
    return this.userService.create(input)
  }
}
