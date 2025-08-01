import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { getEndPoint } from './utils/get-endpoint';
import { Role } from './role/entities/role.entity';
import { Endpoint } from './endpoint/entities/endpoint.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(process.env.PORT ?? 3000);

  const dataSource = app.get(DataSource)
  const queryRunner = dataSource.createQueryRunner()
  
  try {
    await queryRunner.connect()
    await queryRunner.startTransaction()

    await queryRunner.query('TRUNCATE TABLE endpoint RESTART IDENTITY CASCADE')

    await queryRunner.query('TRUNCATE TABLE permission RESTART IDENTITY CASCADE')

    console.log('Success truncate the table!');
 
    // get the endpoint
    const server = app.getHttpAdapter().getInstance();
    const router = server.router;
    const availableRoutes = getEndPoint(router)

    // insert all endpoint to db
    await availableRoutes.forEach(async (value) => {
      await queryRunner.manager.createQueryBuilder().insert().into('endpoint').values({url: value.path, method: value.method.toUpperCase()}).execute()
    })

    // get all role from db 
    const roles = await queryRunner.manager.getRepository(Role).createQueryBuilder('role').where('role.isActive = :isActive', {isActive: true}).getMany()

    // get all endpoint from db

    const endpoints = await queryRunner.manager.getRepository(Endpoint).createQueryBuilder('endpoint').getMany()

    for(const role of roles) {
      for(const endpoint of endpoints) {
        await queryRunner.manager.createQueryBuilder().insert().into('permission').values({role_name: role.name, endpoint_id: endpoint.id, isAllow: role.name === 'admin'? true : false }).execute()
      }
    }

    console.log('Success import all routes into database');
    await queryRunner.commitTransaction()
  } catch (error) {
    await queryRunner.rollbackTransaction()
  } finally {
    await queryRunner.release()
  }

}

bootstrap();
