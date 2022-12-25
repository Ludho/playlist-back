import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {


  
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  async findAll() {
    return "ff"     
  }

  async findOne(id: number) {
    return "ff"
  }

  update(id: number, updateVideo: any) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
