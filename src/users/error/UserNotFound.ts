export class UserNotFound extends Error {
  constructor(id: string) {
    super(`user with ${id} not found`);
  }
}
