type AuthUser = {
  id: string;
  username: string;
  role: string;
  roomId?: string;
  createdAt: Date;
  updatedAt?: Date;
};
