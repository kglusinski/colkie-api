import { Room } from './room.entity';
import { Result } from '../../common/result';
import { RoomNotFound } from '../error/RoomNotFound';

export interface RoomsRepository {
  findOne(predicates: object): Promise<Result<Room, RoomNotFound>>;
  save(room: Room);
  updateUserRoom(userId: string, roomId: string);
}
