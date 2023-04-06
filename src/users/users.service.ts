import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './domain/users_repository';
import { Result } from '../common/result';
import { User } from './domain/user';
import { UserNotFound } from './error/UserNotFound';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import * as argon2 from 'argon2';

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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newID = uuid();
    const passwordHash = await argon2.hash(createUserDto.password);
    const user = new User(
      newID,
      createUserDto.username,
      passwordHash,
      createUserDto.role,
    );

    return this.repository.save(user);
  }
}
