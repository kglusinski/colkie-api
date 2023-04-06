export class User {
  id: string;
  username: string;
  hash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  roomId?: string;

  constructor(id: string, username: string, hash: string, role: string) {
    if (!id || !username || !hash || !role)
      throw new Error('Invalid user params');

    this.id = id;
    this.username = username;
    this.hash = hash;
    this.role = role;

    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.roomId = undefined;
  }
}
