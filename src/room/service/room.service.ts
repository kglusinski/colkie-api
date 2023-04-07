import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRoomDto } from '../dto/room.dto';
import { Room } from '../domain/room.entity';
import { RoomsRepository } from '../domain/rooms_repository';
import { ChatUser } from '../domain/chat_user';
import { Message } from '../domain/message';
import { v4 as uuid } from 'uuid';

const RoomsRepository = Inject('RoomsRepository');

@Injectable()
export class RoomService {
  constructor(
    @RoomsRepository private readonly roomsRepository: RoomsRepository,
  ) {}

  async create(createRoomDto: CreateRoomDto, user: ChatUser): Promise<Room> {
    if (!user.isArtist()) {
      console.log(user);
      throw new UnauthorizedException();
    }

    const { name } = createRoomDto;
    const id = uuid();
    const room = new Room(id, name, user.getId());

    try {
      this.roomsRepository.save(room);
    } catch (e) {
      console.log(e);
    }

    return room;
  }

  async join(roomId: string, user: ChatUser) {
    user.joinRoom(roomId);

    const res = await this.roomsRepository.findOne({ id: roomId });

    if (res.result === 'error') {
      await Promise.reject(new Error('Room not found'));
    }

    return this.roomsRepository.updateUserRoom(user.getId(), roomId);
  }

  async leave(roomId: string, user: ChatUser) {
    user.leaveRoom();

    return this.roomsRepository.updateUserRoom(user.getId(), null);
  }

  async postMessage(roomId: string, content: string, chatUser: ChatUser) {
    const res = await this.roomsRepository.findOne({ id: roomId });

    if (res.result === 'error') {
      throw new Error('Room not found');
    }
    const room = res.value;
    const message = new Message(content, room.id, chatUser);

    room.postMessage(message, chatUser);

    this.roomsRepository.save(room);
  }
}
