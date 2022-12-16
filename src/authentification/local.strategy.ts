import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import User from '../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authentificationService: AuthentificationService) {
    super({
      usernameField: 'email'
    });
  }
  async validate(email: string, password: string): Promise<User> {
    return this.authentificationService.getAuthenticatedUser(email, password);
  }
}