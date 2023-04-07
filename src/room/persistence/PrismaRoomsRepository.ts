import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomsRepository } from '../domain/rooms_repository';
import { Room } from '../domain/room.entity';
import { RoomNotFound } from '../error/RoomNotFound';
import { Result } from '../../common/result';
import { Message } from '../domain/message';
import { MessageMapper } from '../mapper/message_mapper';
import { RoomMapper } from '../mapper/room_mapper';

@Injectable()
export class PrismaRoomsRepository implements RoomsRepository {
  constructor(
    private prisma: PrismaService,
    private roomMapper: RoomMapper,
    private messageMapper: MessageMapper,
  ) {}

  async findOne(predicates: object): Promise<Result<Room, RoomNotFound>> {
    const room = await this.prisma.room.findUnique({
      where: predicates,
    });

    if (!room) {
      return { result: 'error', error: new RoomNotFound('id') };
    }

    return {
      result: 'success',
      value: await this.roomMapper.PrismaRoomToDomainRoom(room),
    };
  }

  async save(room: Room) {
    const prismaRoom = await this.roomMapper.DomainRoomToPrismaRoom(room);

    await this.prisma.room.upsert({
      where: { id: prismaRoom.id },
      update: prismaRoom,
      create: prismaRoom,
    });
  }

  async updateUserRoom(userId: string, roomId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { roomId: roomId },
    });
  }

  async findMessagesByRoomId(roomId: string): Promise<Message[]> {
    const prismaMessages = await this.prisma.message.findMany({
      where: { roomId: roomId },
    });

    const messages = await Promise.all(
      prismaMessages.map(async (prismaMessage) => {
        return await this.messageMapper.PrismaMessageToDomainMessage(
          prismaMessage,
        );
      }),
    );

    return messages;
  }
}
