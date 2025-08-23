import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const config = new DocumentBuilder()
    .setTitle('eCommerce APIs')
    .setDescription('The eCommerce API description')
    .setVersion('1.0')
    .addTag('eCommerce')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  
  app.enableCors();

  const configService = app.get(ConfigService); 

  const PORT = configService.get('PORT') || 3000;

  await app.listen(PORT ?? 3000);
}

bootstrap();
