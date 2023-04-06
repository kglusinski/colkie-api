import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaUserRepository } from './persistence/prisma_user_repository';

@Module({
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
