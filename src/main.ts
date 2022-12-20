import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.APP_URL,
    credentials:true
  });
  console.log(process.env.APP_URL)
  await app.listen(3030);
}
bootstrap();
