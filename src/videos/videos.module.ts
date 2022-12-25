import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { YoutubeService } from 'src/youtube/youtube.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService,YoutubeService]
})
export class VideosModule {}
