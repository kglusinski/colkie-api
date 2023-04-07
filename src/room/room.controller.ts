import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from './dto/room.dto';
import { CreateRoomService } from './service/create_room.service';
import { JwtGuard } from '../auth/guard/jwt_guard';
import { GetUser } from '../auth/decorator/GetUser';
import { ChatUser } from './domain/chat_user';

@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: CreateRoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @GetUser() user) {
    return await this.roomsService.create(createRoomDto, user);
  }

  @Post(':id/users')
  join(@Param('id') roomId: string, @GetUser() user: AuthUser) {
    const chatUser = this.mapToChatUser(user);

    return this.roomsService.join(roomId, chatUser);
  }

  private mapToChatUser(user: AuthUser): ChatUser {
    return new ChatUser(user.id, user.username, user.username, user.roomId);
  }
}
