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
    thumbnail:string;

    @IsString()
    description:string;

    @IsNumber()
    duration:number;

}
