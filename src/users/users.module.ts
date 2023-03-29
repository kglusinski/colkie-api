import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './domain/users_repository';
import { InMemoryUserRepository } from './persistence/in_memory_user_repository';

@Module({
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
