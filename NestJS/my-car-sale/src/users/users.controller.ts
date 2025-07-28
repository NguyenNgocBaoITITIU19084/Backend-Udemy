import {Post, Controller, Body, Get, Patch, Delete, Param, Query, Session, UseGuards } from '@nestjs/common';

import {CreateUserDto} from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ResponseUserDto } from './dtos/response-user.dts';

import { Interceptor } from '../interceptor/interceptor';
import { AuthGuard } from '../guard/auth.guard';

import {User} from '../decorator/user.decorator'

import { UsersService } from './users.service';
import { AuthService } from './auth/auth.service';

@Controller('auth')
@Interceptor(ResponseUserDto)
export class UsersController {
 constructor(private usersService: UsersService, private authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@User() user: number) {
    return this.usersService.findOne(user);
  }

  @Post('signout')
  signOut(@Session() session: any) {
    // Logic to sign out the user
    return session.userId = null;
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    // Logic to create a user
    
    const { email, password } = body;

    const user = await this.authService.signup(email, password);

    // Store user ID in session
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    // Logic to create a user

    const { email, password } = body;

    const user = await this.authService.signin(email, password);
   // Store user ID in session
    session.userId = user.id;
    return user;
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {  
    // Logic to find a user by ID
    return this.usersService.findOne(parseInt(id));
  }

  @Get('users')
  getUserByEmail(@Query('email') email: string) { 
    // Logic to find a user by email
    return this.usersService.find(email);
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    // Logic to remove a user by ID
    return this.usersService.removeUser(parseInt(id));
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    // Logic to update a user by ID
    return this.usersService.update(parseInt(id), body);
  }

}
