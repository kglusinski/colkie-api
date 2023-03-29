import { UsersRepository } from '../domain/users_repository';
import { User } from '../domain/user';
import { Result } from '../../common/result';
import { UserNotFound } from '../error/UserNotFound';

export class InMemoryUserRepository implements UsersRepository {
  private database: User[] = [
    { id: 'asd', username: 'lorem@ipsum.com', role: 'USER', hash: '' },
  ];

  findOne(id: string): Result<User, UserNotFound> {
    const user = this.database.find((el) => {
      return el.id == id;
    });

    if (user) {
      return { result: 'success', value: user };
    }

    return { result: 'error', error: new UserNotFound(id) };
  }
}
