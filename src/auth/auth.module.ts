import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { GetToken } from './service/get_token.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [GetToken],
  controllers: [AuthController],
})
export class AuthModule {}
