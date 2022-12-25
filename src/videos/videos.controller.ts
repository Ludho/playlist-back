import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { YoutubeService } from 'src/youtube/youtube.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService,
              private readonly youtubeService: YoutubeService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get('youtube/:id')
  findYoutube(@Param('id') id: string) {
    return this.youtubeService.getYoutubeVideoFromId(id);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: any) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
