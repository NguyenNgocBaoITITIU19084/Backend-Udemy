import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserInterceptor} from './interceptor/user.interceptor'
import { Users } from './users.entity';
import { AuthService } from './auth/auth.service';
import {APP_INTERCEPTOR} from '@nestjs/core'

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor
    },
    ]
})
export class UsersModule {}
