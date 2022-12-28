import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { YoutubeService } from 'src/youtube/youtube.service';
import JwtAuthentificationGuard from 'src/authentification/jwt/jwt-authentification.guard';
import RequestWithUser from 'src/guards/requestWithUser.interface';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService,
              private readonly youtubeService: YoutubeService) {}


  @UseGuards(JwtAuthentificationGuard)
  @Post()
  create(@Req() request: RequestWithUser, @Body() createVideo: CreateVideoDto) {
    console.log(createVideo)
    return this.videosService.create(createVideo,request.user);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Get('youtube/:id')
  findYoutube(@Param('id') id: string) {
    return this.youtubeService.getYoutubeVideoFromId(id);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Get('')
  findAll(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.videosService.findAll(request.user.id);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Get(':id')
  findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.videosService.findOne(+id,request.user.id);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: any) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Delete(':id')
  remove(@Req() request: RequestWithUser, @Param('id') id: string) {
    return this.videosService.remove(+id, request.user.id);
  }
}
