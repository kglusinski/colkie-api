import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { GetToken } from './service/get_token.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt_strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: await config.get('JWT_SECRET'),
      }),
    }),
    UsersModule,
    ConfigModule,
  ],
  providers: [GetToken, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
