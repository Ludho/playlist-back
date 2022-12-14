
import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { UsersModule } from '../user/user.module';
import { AuthentificationController } from './authentification.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { JwtStrategy } from './jwt/jwt.strategy';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
  ],
  providers: [AuthentificationService, LocalStrategy, JwtStrategy],
  controllers: [AuthentificationController]
})
export class AuthentificationModule {}