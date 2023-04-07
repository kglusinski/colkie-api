import { Room } from './room.entity';
import { Result } from '../../common/result';
import { RoomNotFound } from '../error/RoomNotFound';
import { Message } from './message';

export interface RoomsRepository {
  findOne(predicates: object): Promise<Result<Room, RoomNotFound>>;
  save(room: Room);
  updateUserRoom(userId: string, roomId: string);
  // findMessagesByRoomId(roomId: string): Promise<Message[]>;
}
