import { Message as PrismaMessage } from '.prisma/client';
import { Message } from '../domain/message';
import { UsersService } from '../../users/users.service';
import { ChatUser } from '../domain/chat_user';
import { User } from '../../users/domain/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageMapper {
  constructor(private users: UsersService) {}

  async PrismaMessageToDomainMessage(
    prismaMessage: PrismaMessage,
  ): Promise<Message> {
    const res = await this.users.findUser(prismaMessage.userId);
    if (res.result === 'error') {
      throw new Error('User not found');
    }
    const user = res.value;

    const message = new Message(
      prismaMessage.content,
      prismaMessage.roomId,
      this.userToChatUser(user),
    );
    message.id = prismaMessage.id;
    message.createdAt = prismaMessage.createdAt;
    message.updatedAt = prismaMessage.updatedAt;

    return message;
  }

  DomainMessageToPrismaMessage(message: Message): PrismaMessage {
    return {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      roomId: message.roomId,
      userId: message.author.getId(),
    };
  }

  private userToChatUser(user: User): ChatUser {
    return new ChatUser(user.id, user.username, user.role, user.roomId);
  }
}
