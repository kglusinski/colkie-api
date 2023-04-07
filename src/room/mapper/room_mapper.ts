import { Room as PrismaRoom } from '@prisma/client';
import { Room } from '../domain/room.entity';
import { RoomsRepository } from '../domain/rooms_repository';
import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

// const RoomsRepository = Inject('RoomsRepository');

@Injectable()
export class RoomMapper {
  constructor(private moduleRef: ModuleRef) {}

  private get roomRepository(): RoomsRepository {
    return this.moduleRef.get<RoomsRepository>('RoomsRepository', {
      strict: false,
    });
  }

  async PrismaRoomToDomainRoom(prismaRoom: PrismaRoom): Promise<Room> {
    // const messages = await this.roomRepository.findMessagesByRoomId(
    //   prismaRoom.id,
    // );

    const room = new Room(prismaRoom.id, prismaRoom.name, prismaRoom.createdBy);
    room.description = '';
    room.createdAt = prismaRoom.createdAt;
    room.updatedAt = prismaRoom.updatedAt;
    room.messages = [];

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
