import { ChatUser } from './chat_user';

export class Message {
  id: string;
  content: string;
  author: ChatUser;
  createdAt: Date;
  updatedAt?: Date;
  roomId: string;

  constructor(content: string, roomId: string, author: ChatUser) {
    this.content = content;
    this.author = author;
    this.roomId = roomId;
    this.createdAt = new Date();
  }
}
