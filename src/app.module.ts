import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthentificationModule } from './authentification/authentification.module';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { VideosModule } from './videos/videos.module';
import { YoutubeService } from './youtube/youtube.service';

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
