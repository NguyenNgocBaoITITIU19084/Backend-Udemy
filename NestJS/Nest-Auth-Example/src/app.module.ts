import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import AppDataSource from '../ormconfig'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:
  [
    TypeOrmModule.forRoot(AppDataSource),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
