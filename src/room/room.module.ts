import { Module } from '@nestjs/common';
import { CreateRoomService } from './service/create_room.service';
import { PrismaRoomsRepository } from './persistence/PrismaRoomsRepository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomsController } from './room.controller';

@Module({
  imports: [JwtModule, PrismaModule],
  providers: [
    CreateRoomService,
    {
      provide: 'RoomsRepository',
      useClass: PrismaRoomsRepository,
    },
  ],
  controllers: [RoomsController],
})
export class RoomModule {}
