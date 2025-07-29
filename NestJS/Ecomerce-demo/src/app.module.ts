import { Module, NestModule, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './tags/tags.module';
import { UserModule } from './user/user.module';
import { AuthMiddleWare } from './user/middleware/auth.middleware';

import configPg from "../ormconfig"

@Module({
  imports: [TypeOrmModule.forRoot(
    configPg
  ),ConfigModule.forRoot({
    isGlobal: true
  }), TagsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
