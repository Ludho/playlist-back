import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  async create(createVideo: CreateVideoDto, user: User) {
    const newVideo = await this.videosRepository.create(createVideo);
    newVideo.user = user;
    await this.videosRepository.save(newVideo);
    newVideo.user = undefined;
    return newVideo;
  }

  async findAll(userId:number) {
    const videos = await this.videosRepository.find({
      relations: {
        user: true,
      },
      where: {
        user:{id:userId}
      },
    });
    if (videos) {
      return videos.map(video=>{
        video.user = undefined
        return video
      });
    }
    throw new HttpException(
      'Error getting video',
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(id: number,userId:number) {
    const video = await this.videosRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: id,
        user:{id:userId}
      },
    });
    if (video) {
      return video;
    }
    throw new HttpException(
      'Video with this id does not exist or User don`t posses this video',
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: number, updateVideo: any) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
