import { v4 as uuid } from 'uuid';
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

  constructor() {
    this.id = uuid();
  }

  postMessage(message: Message, chatUser: ChatUser) {
    if (chatUser.getRoomId() !== this.id) {
      throw new Error('User is not in this room');
    }

    this.messages.push(message);
  }
}
