import { UsersRepository } from '../domain/users_repository';
import { User } from '../domain/user';
import { Result } from '../../common/result';
import { UserNotFound } from '../error/UserNotFound';
import { Injectable } from '@nestjs/common';

export type Predicate = { id: string } | { username: string };

@Injectable()
export class InMemoryUserRepository implements UsersRepository {
  private database: User[] = [
    {
      id: 'asd',
      username: 'lorem@ipsum.com',
      role: 'USER',
      hash: '$argon2id$v=19$m=65536,t=3,p=4$/j0/y9Ii2y0zYh0VfARIdg$1XRs+Z7gMt++Xp4/j6kD2LfBhj42MdQTlV9ECN5J2KE',
    },
  ];

  async findOne(cond: Predicate): Promise<Result<User, UserNotFound>> {
    const user = await this.database.find((el) => {
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

  save(user: User): Promise<User> {
    this.database.push(user);
    return Promise.resolve(user);
  }
}
