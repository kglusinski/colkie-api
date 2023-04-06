import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRoomDto } from '../dto/room.dto';
import { Room } from '../domain/room.entity';
import { JwtService } from '@nestjs/jwt';
import { RoomsRepository } from '../domain/rooms_repository';
import { User } from '../domain/user';
import { Role } from '../../auth/domain/Role';

const RoomsRepository = Inject('RoomsRepository');

@Injectable()
export class CreateRoomService {
  constructor(
    @RoomsRepository private readonly roomsRepository: RoomsRepository,
  ) {}

  async create(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
    if (user.role !== Role.ARTIST) {
      throw new UnauthorizedException();
    }

    const { name } = createRoomDto;
    const room = new Room();
    room.name = name;
    room.creatorId = user.id;

    return this.roomsRepository.save(room);
  }
}
