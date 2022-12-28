import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthentificationModule } from './authentification/authentification.module';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { VideosModule } from './videos/videos.module';
import { YoutubeService } from './youtube/youtube.service';
require('dotenv').config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      charset: 'utf8mb4'
    }),
    AuthentificationModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    VideosModule
  ],
  controllers: [],
  providers: [YoutubeService],
})
export class AppModule { }
