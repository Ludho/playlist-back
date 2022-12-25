import { IsNumber, IsString } from "class-validator";
export class CreateVideoDto {
    @IsString()
    videoId:string;
    
    @IsString()
    publishedAt:string;

    @IsString()
    channelId:string;

    @IsString()
    channelTitle:string;

    @IsString()
    title:string;

    @IsString()
    thumbnails:string;

    @IsString()
    description:string;

    @IsNumber()
    duration:string;

    @IsString()
    viewCount:number;
}
