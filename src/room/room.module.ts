import { Module } from '@nestjs/common';
import { CreateRoomService } from './service/create_room.service';
import { PrismaRoomsRepository } from './persistence/PrismaRoomsRepository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [JwtModule, PrismaModule],
  providers: [
    CreateRoomService,
    {
      provide: 'RoomsRepository',
      useClass: PrismaRoomsRepository,
    },
  ],
})
export class RoomModule {}
