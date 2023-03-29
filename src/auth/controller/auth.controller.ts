import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { Credentials } from '../dto/credentials';
import { GetToken } from '../service/get_token.service';

@Controller('token')
export class AuthController {
  constructor(private getTokenService: GetToken) {}
  @Post()
  async getToken(@Body() reqBody: Credentials) {
    const res = await this.getTokenService.getToken(reqBody);

    switch (res.result) {
      case 'success':
        return res.value;
      case 'error':
        throw new UnauthorizedException(res.error);
    }
  }
}
