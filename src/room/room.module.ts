import { Module } from '@nestjs/common';
import { CreateRoomService } from './service/create_room.service';
import { PrismaRoomsRepository } from './persistence/PrismaRoomsRepository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomsController } from './room.controller';
import { RoomMapper } from './mapper/room_mapper';
import { MessageMapper } from './mapper/message_mapper';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [JwtModule, PrismaModule, UsersModule],
  providers: [
    CreateRoomService,
    {
      provide: 'RoomsRepository',
      useClass: PrismaRoomsRepository,
    },
    RoomMapper,
    MessageMapper,
  ],
  controllers: [RoomsController],
})
export class RoomModule {}
