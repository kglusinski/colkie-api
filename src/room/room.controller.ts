import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateRoomDto } from './dto/room.dto';
import { CreateRoomService } from './service/create_room.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: CreateRoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @Req() req) {
    const accessToken = req.headers.authorization.split(' ')[1];

    const room = await this.roomsService.create(createRoomDto, accessToken);
    return { room };
  }
}
