import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportModule } from './report/report.module';

import {Users} from "./users/users.entity"
import {Report} from "./report/report.entity"

@Module({
  imports: 
  [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DB_NAME'),
        entities: [Users, Report],
        synchronize: true,
        logging: true,
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'database.sqlite',
    //   entities: [Users,Report],
    //   synchronize: true,
    //   logging: true,
    // }),
    UsersModule, 
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
