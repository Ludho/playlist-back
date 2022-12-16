import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthentificationModule } from './authentification/authentification.module';
import { AuthentificationController } from './authentification/authentification.controller';
import { AuthentificationService } from './authentification/authentification.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'yourtube',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthentificationModule,
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME:  Joi.string().required(),
      })
    })
  ],
  controllers: [AuthentificationController, UserController],
  providers: [AuthentificationService, UserService],
})
export class AppModule { }
