import {Post, Controller, Body, Get, Patch, Delete, Param, Query } from '@nestjs/common';

import {CreateUserDto} from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import { UsersService } from './users.service';

import { log } from 'console';


@Controller('auth')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    // Logic to create a user

    const { email, password } = body;

    return this.usersService.createUser(email, password);
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
