import { Room as PrismaRoom } from '@prisma/client';
import { Room } from '../domain/room.entity';
import { RoomsRepository } from '../domain/rooms_repository';
import { Injectable } from '@nestjs/common';
import { InjectRoomsRepository } from '../decorator/repository';

@Injectable()
export class RoomMapper {
  constructor(@InjectRoomsRepository private roomRepository: RoomsRepository) {}

  async PrismaRoomToDomainRoom(prismaRoom: PrismaRoom): Promise<Room> {
    const messages = await this.roomRepository.findMessagesByRoomId(
      prismaRoom.id,
    );

    const room = new Room();
    room.id = prismaRoom.id;
    room.name = prismaRoom.name;
    room.description = '';
    room.creatorId = prismaRoom.createdBy;
    room.createdAt = prismaRoom.createdAt;
    room.updatedAt = prismaRoom.updatedAt;
    room.messages = messages;

    return room;
  }

  DomainRoomToPrismaRoom(room: Room): PrismaRoom {
    return {
      id: room.id,
      name: room.name,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      createdBy: room.creatorId,
    };
  }
}
