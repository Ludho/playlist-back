import { Injectable } from '@nestjs/common';
import Youtube from 'youtube.ts';

@Injectable()
export class YoutubeService {

    youtube = new Youtube(process.env.GOOGLE_API_KEY)

    getYoutubeVideoFromId = async(id:string)=>{
        return await this.youtube.videos.get("https://www.youtube.com/watch?v="+id).catch(er=>{
            return null
        })
    }

}
