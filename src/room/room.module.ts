import { Module, forwardRef } from '@nestjs/common';
import { CreateRoomService } from './service/create_room.service';
import { PrismaRoomsRepository } from './persistence/PrismaRoomsRepository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomsController } from './room.controller';
import { UsersModule } from '../users/users.module';
import { MessageMapper } from './mapper/message_mapper';
import { RoomMapper } from './mapper/room_mapper';

@Module({
  imports: [JwtModule, PrismaModule, UsersModule],
  providers: [
    CreateRoomService,
    {
      provide: 'RoomsRepository',
      useClass: PrismaRoomsRepository,
    },
    MessageMapper,
    RoomMapper,
  ],
  controllers: [RoomsController],
})
export class RoomModule {}
