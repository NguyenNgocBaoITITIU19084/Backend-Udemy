import { NestFactory } from '@nestjs/core';
import { ValidationPipe} from "@nestjs/common"

const  cookieSession = require('cookie-session');

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieSession({
  name: 'session',
  keys: ['your-secret-key'], // Replace with your actual secret key or use an array of keys for rotation

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true,
    // transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
