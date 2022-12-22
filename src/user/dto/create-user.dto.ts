/* eslint-disable prettier/prettier */
import {IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
  @IsNumber()
  avatarID: number;
}
 
