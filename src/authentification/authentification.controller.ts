import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthentificationService } from './authentification.service';
import RegisterDto from './register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}



  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authentificationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const {user} = request;
    const cookie = this.authentificationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authentificationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
