import { User } from './user';
import { Result } from '../../common/result';
import { UserNotFound } from '../error/UserNotFound';

export interface UsersRepository {
  findOne(id: string): Result<User, UserNotFound>;
}
