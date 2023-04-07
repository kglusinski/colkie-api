import { Role } from '../../auth/domain/Role';

export class ChatUser {
  constructor(
    private id: string,
    private username: string,
    private role: string,
    private roomId?: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getRole(): string {
    return this.role;
  }

  getRoomId(): string {
    return this.roomId;
  }

  isArtist(): boolean {
    return this.role === Role.ARTIST;
  }

  joinRoom(roomId: string): void {
    if (this.roomId) {
      throw new Error('User already in a room');
    }

    this.roomId = roomId;
  }

  leaveRoom() {
    if (!this.roomId) {
      throw new Error('User not in a room');
    }

    this.roomId = undefined;
  }
}
