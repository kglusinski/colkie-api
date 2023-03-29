import { User } from './user';
import { Result } from '../../common/result';
import { UserNotFound } from '../error/UserNotFound';

export interface UsersRepository {
  findOne(predicates: object): Result<User, UserNotFound>;
}
