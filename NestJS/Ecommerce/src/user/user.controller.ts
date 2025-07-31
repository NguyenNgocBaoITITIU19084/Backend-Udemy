import { Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/@core/guard/auth.guard';
import { CurrentUser } from '../@core/decorator/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('me')
  @UseGuards(AuthGuard)
  create(@CurrentUser() user: CurrentUserDto ) {
    return user
  }

}
