import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { GetToken } from './service/get_token.service';

@Module({
  imports: [],
  providers: [GetToken],
  controllers: [AuthController],
})
export class AuthModule {}
