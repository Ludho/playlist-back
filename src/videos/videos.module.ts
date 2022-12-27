import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { YoutubeService } from 'src/youtube/youtube.service';
import { VideoRepository } from './video.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideosController],
  providers: [VideosService,YoutubeService,VideoRepository]
})
export class VideosModule {}