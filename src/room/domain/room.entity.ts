import { v4 as uuid } from 'uuid';

export class Room {
  id: string;

  name: string;

  description: string;

  creatorId: string;

  constructor() {
    this.id = uuid();
  }
}
