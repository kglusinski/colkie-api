import { Injectable } from '@nestjs/common';
import { Credentials } from '../dto/credentials';
import { Token } from '../dto/token';
import { Result } from '../../common/result';
import { BadCredentials } from '../error/bad_credentials';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserNotFound } from '../../users/error/UserNotFound';
import * as argon from 'argon2';

@Injectable()
export class GetToken {
  constructor(
    private jwtService: JwtService,
    private users: UsersService,
    private config: ConfigService,
  ) {}
  async getToken(
    creds: Credentials,
  ): Promise<Result<Token, BadCredentials | UserNotFound>> {
    const res = await this.users.findUserByUsername(creds.username);
    if (res.result == 'success') {
      const user = res.value;
      const isPasswordValid = argon.verify(user.hash, creds.password);
      if (isPasswordValid) {
        return {
          result: 'success',
          value: new Token(this.sign(user.id, user.role)),
        };
      }
    }

    return { result: 'error', error: new BadCredentials() };
  }

  private sign(userId: string, role: string) {
    const data = {
      sub: userId,
      role: role,
    };
    const secret = this.config.get('JWT_SECRET');

    return this.jwtService.sign(data, {
      expiresIn: '15m',
      secret: secret,
    });
  }
}
