import { v4 as uuid } from 'uuid';

export class Room {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor() {
    this.id = uuid();
  }
}
