import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/room.dto';
import { CreateRoomService } from './service/create_room.service';
import { JwtGuard } from '../auth/guard/jwt_guard';
import { GetUser } from '../auth/decorator/GetUser';
import { ChatUser } from './domain/chat_user';
import { MessageDto } from './dto/message.dto';

@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: CreateRoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @GetUser() user) {
    const chatUser = this.mapToChatUser(user);
    return await this.roomsService.create(createRoomDto, chatUser);
  }

  @Post(':id/users')
  @HttpCode(204)
  async join(@Param('id') roomId: string, @GetUser() user: AuthUser) {
    const chatUser = this.mapToChatUser(user);
    try {
      await this.roomsService.join(roomId, chatUser);
    } catch (e) {
      console.error(e);
      throw new BadRequestException(e.message);
    }

    return null;
  }

  @Delete(':id/users')
  @HttpCode(204)
  async leave(@Param('id') roomId: string, @GetUser() user: AuthUser) {
    const chatUser = this.mapToChatUser(user);

    try {
      await this.roomsService.leave(roomId, chatUser);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return null;
  }

  // @Post(':id/messages')
  // postMessage(
  //   @Param('id') roomId: string,
  //   @Body() message: MessageDto,
  //   @GetUser() user: AuthUser,
  // ) {
  //   const chatUser = this.mapToChatUser(user);
  //
  //   return this.roomsService.postMessage(roomId, message.content, chatUser);
  // }

  private mapToChatUser(user: AuthUser): ChatUser {
    return new ChatUser(user.id, user.username, user.role, user.roomId);
  }
}
