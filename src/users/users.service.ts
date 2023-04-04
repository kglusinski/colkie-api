import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './domain/users_repository';
import { Result } from '../common/result';
import { User } from './domain/user';
import { UserNotFound } from './error/UserNotFound';

const UsersRepository = Inject('UsersRepository');

@Injectable()
export class UsersService {
  constructor(@UsersRepository private repository: UsersRepository) {}

  async findUser(id: string): Promise<Result<User, UserNotFound>> {
    return this.repository.findOne({ id });
  }

  async findUserByUsername(
    username: string,
  ): Promise<Result<User, UserNotFound>> {
    return this.repository.findOne({ username: username });
  }
}
