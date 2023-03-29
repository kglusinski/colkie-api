import { Injectable } from '@nestjs/common';
import { Credentials } from '../dto/credentials';
import { Token } from '../dto/token';
import { Result } from '../../common/result';
import { BadCredentials } from '../error/bad_credentials';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserNotFound } from '../../users/error/UserNotFound';

@Injectable()
export class GetToken {
  constructor(
    private jwtService: JwtService,
    private users: UsersService,
    private config: ConfigService,
  ) {}
  getToken(creds: Credentials): Result<Token, BadCredentials | UserNotFound> {
    const res = this.users.findUserByUsername(creds.username);

    if (res.result == 'success') {
      const user = res.value;
      if (creds.password === 'pass' && creds.username === user.username) {
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
