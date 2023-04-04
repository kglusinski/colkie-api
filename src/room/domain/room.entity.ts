import { uuid as uuidv4 } from 'uuid';

export class Room {
  id: string;

  name: string;

  description: string;

  creatorId: uuidv4;

  constructor() {
    this.id = uuidv4();
  }
}
