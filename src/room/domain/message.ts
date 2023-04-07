import { ChatUser } from './chat_user';

export class Message {
  id: string;
  content: string;
  author: ChatUser;
  createdAt: Date;
  updatedAt?: Date;
  roomId: string;

  constructor(content: string, author: ChatUser) {
    this.content = content;
    this.author = author;
    this.createdAt = new Date();
  }
}
