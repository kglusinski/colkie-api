import { UsersRepository } from '../domain/users_repository';
import { User } from '../domain/user';
import { Result } from '../../common/result';
import { UserNotFound } from '../error/UserNotFound';
import { Injectable } from '@nestjs/common';

export type Predicate = { id: string } | { username: string };

@Injectable()
export class InMemoryUserRepository implements UsersRepository {
  private database: User[] = [
    { id: 'asd', username: 'lorem@ipsum.com', role: 'USER', hash: '' },
  ];

  findOne(cond: Predicate): Result<User, UserNotFound> {
    const user = this.database.find((el) => {
      if ('id' in cond) {
        return el.id === cond.id;
      }
      if ('username' in cond) {
        return el.username === cond.username;
      }
    });

    if (user) {
      return { result: 'success', value: user };
    }

    return { result: 'error', error: new UserNotFound('id') };
  }
}
