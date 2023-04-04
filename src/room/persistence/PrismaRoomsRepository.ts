import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomsRepository } from '../domain/rooms_repository';
import { Room } from '../domain/room.entity';
import { Room as PrismaRoom } from '@prisma/client';
import { RoomNotFound } from '../error/RoomNotFound';
import { Result } from '../../common/result';

@Injectable()
export class PrismaRoomsRepository implements RoomsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(predicates: object): Promise<Result<Room, RoomNotFound>> {
    const room = await this.prisma.room.findUnique({
      where: predicates,
    });

    if (!room) {
      return { result: 'error', error: new RoomNotFound('id') };
    }

    return { result: 'success', value: this.toDomainRoom(room) };
  }

  async save(room: Room) {
    const prismaRoom = this.toPrismaRoom(room);

    await this.prisma.room.upsert({
      where: { id: prismaRoom.id },
      update: prismaRoom,
      create: prismaRoom,
    });
  }

  private toDomainRoom(prismaRoom: PrismaRoom): Room {
    return {
      id: prismaRoom.id,
      name: prismaRoom.name,
      description: '',
      creatorId: undefined,
    };
  }

  private toPrismaRoom(room: Room): PrismaRoom {
    return {
      id: room.id,
      name: room.name,
      createdAt: undefined,
      updatedAt: undefined,
    };
  }
}
