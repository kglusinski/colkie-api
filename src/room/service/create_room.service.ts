import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRoomDto } from '../dto/room.dto';
import { Room } from '../domain/room.entity';
import { RoomsRepository } from '../domain/rooms_repository';
import { ChatUser } from '../domain/chat_user';
import { Message } from '../domain/message';
import { InjectRoomsRepository } from '../decorator/repository';

@Injectable()
export class CreateRoomService {
  constructor(
    @InjectRoomsRepository private readonly roomsRepository: RoomsRepository,
  ) {}

  async create(createRoomDto: CreateRoomDto, user: ChatUser): Promise<Room> {
    if (!user.isArtist()) {
      throw new UnauthorizedException();
    }

    const { name } = createRoomDto;
    const room = new Room();
    room.name = name;
    room.creatorId = user.getId();

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
    const message = new Message(content, chatUser);

    room.postMessage(message, chatUser);

    this.roomsRepository.save(room);
  }
}
