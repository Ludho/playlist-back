import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { AuthentificationService } from './authentification.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthentificationGuard } from './local/localAuthentification.guard';
import JwtAuthentificationGuard from './jwt/jwt-authentification.guard';

@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}



  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authentificationService.register(registrationData);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Put('/')
  async update(@Body() userData: any,@Req() request: RequestWithUser) {
    userData={...userData,id: request.user.id}
    return this.authentificationService.putAuthenticatedUser(userData);
  }
  @UseGuards(JwtAuthentificationGuard)
  @Delete('/')
  async delete(@Req() request: RequestWithUser) {
    return this.authentificationService.deleteAuthenticatedUser(request.user.id);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthentificationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const {user} = request;
    const cookie = this.authentificationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authentificationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthentificationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
