import { ChatUser } from './chat_user';
import { Message } from './message';

export class Room {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  createdAt: Date;
  updatedAt?: Date;
  messages: Message[] = [];

  constructor(id: string, name: string, creatorId: string) {
    this.id = id;
    this.name = name;
    this.creatorId = creatorId;
    this.createdAt = new Date();
  }

  postMessage(message: Message, chatUser: ChatUser) {
    if (chatUser.getRoomId() !== this.id) {
      throw new Error('User is not in this room');
    }

    this.messages.push(message);
  }
}
