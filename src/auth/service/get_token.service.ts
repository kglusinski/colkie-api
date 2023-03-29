import { Injectable } from '@nestjs/common';
import { Credentials } from '../dto/credentials';
import { Token } from '../dto/token';
import { Result } from '../../common/result';
import { BadCredentials } from '../error/bad_credentials';

@Injectable()
export class GetToken {
  getToken(creds: Credentials): Result<Token, BadCredentials> {
    if (creds.password === 'pass' && creds.username === 'lorem@ipsum.com') {
      return { result: 'success', value: new Token('sometoken') };
    }

    return { result: 'error', error: new BadCredentials() };
  }
}
