import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../domain/users_repository';
import { Result } from '../../common/result';
import { User } from '../domain/user';
import { User as PrismaUser } from '@prisma/client';
import { UserNotFound } from '../error/UserNotFound';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private db: PrismaService) {}

  async findOne(predicates: object): Promise<Result<User, UserNotFound>> {
    return await this.db.user.findUnique({ where: predicates }).then((user) => {
      if (user) {
        return { result: 'success', value: this.mapToDomainUser(user) };
      }

      return { result: 'error', error: new UserNotFound('id') };
    });
  }

  save(user: User): Promise<User> {
    return this.db.user
      .upsert({
        where: { id: user.id },
        update: this.mapToPrismaUser(user),
        create: this.mapToPrismaUser(user),
      })
      .then((user) => this.mapToDomainUser(user));
  }

  private mapToDomainUser(user: PrismaUser): User {
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      hash: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roomId: user.roomId,
    };
  }

  private mapToPrismaUser(user: User): PrismaUser {
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      password: user.hash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roomId: user.roomId,
    };
  }
}
