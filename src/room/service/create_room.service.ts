import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRoomDto } from '../dto/room.dto';
import { Room } from '../domain/room.entity';
import { JwtService } from '@nestjs/jwt';
import { RoomsRepository } from '../domain/rooms_repository';

const RoomsRepository = Inject('RoomsRepository');

@Injectable()
export class CreateRoomService {
  constructor(
    @RoomsRepository private readonly roomsRepository: RoomsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createRoomDto: CreateRoomDto,
    accessToken: string,
  ): Promise<Room> {
    const { name } = createRoomDto;
    const creatorId = this.getUserIdFromAccessToken(accessToken);

    const room = new Room();
    room.name = name;
    room.creatorId = creatorId;

    return this.roomsRepository.save(room);
  }

  private getUserIdFromAccessToken(accessToken: string): number {
    try {
      const decodedToken = this.jwtService.verify(accessToken);
      return decodedToken.userId;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
