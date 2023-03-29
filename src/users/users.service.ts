import { Injectable } from '@nestjs/common';
import { UsersRepository } from './domain/users_repository';
import { Result } from '../common/result';
import { User } from './domain/user';
import { UserNotFound } from './error/UserNotFound';

@Injectable()
export class UsersService {
  private repository: UsersRepository;

  findUser(id: string): Result<User, UserNotFound> {
    return this.repository.findOne(id);
  }
}
