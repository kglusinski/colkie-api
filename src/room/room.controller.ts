import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from './dto/room.dto';
import { CreateRoomService } from './service/create_room.service';
import { JwtGuard } from '../auth/guard/jwt_guard';
import { GetUser } from '../auth/decorator/GetUser';

@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: CreateRoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @GetUser() user) {
    console.log('user', user);

    const room = await this.roomsService.create(createRoomDto, user);
    return { room };
  }
}
