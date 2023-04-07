import { MessageMapper } from './message_mapper';
import { UsersService } from '../../users/users.service';
import { Message } from '../domain/message';
import { Message as PrismaMessage } from '.prisma/client';
import { ChatUser } from '../domain/chat_user';
import { User } from '../../users/domain/user';
import { v4 as uuid } from 'uuid';
import { Role } from '../../auth/domain/Role';
import { UserNotFound } from '../../users/error/UserNotFound';

describe('MessageMapper', () => {
  let messageMapper: MessageMapper;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService(null); // Pass null as prisma service is not required for this test
    messageMapper = new MessageMapper(usersService);
  });

  it('should be defined', () => {
    expect(messageMapper).toBeDefined();
  });

  describe('PrismaMessageToDomainMessage', () => {
    it('should throw an error when user is not found', async () => {
      const prismaMessage: PrismaMessage = {
        id: uuid(),
        content: 'Hello, world!',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: uuid(),
        userId: uuid(),
      };

      jest.spyOn(usersService, 'findUser').mockResolvedValue({
        result: 'error',
        error: new UserNotFound('User not found'),
      });

      await expect(
        messageMapper.PrismaMessageToDomainMessage(prismaMessage),
      ).rejects.toThrowError('User not found');
    });

    it('should convert a PrismaMessage to a DomainMessage', async () => {
      const prismaMessage: PrismaMessage = {
        id: uuid(),
        content: 'Hello, world!',
        createdAt: new Date(),
        updatedAt: new Date(),
        roomId: uuid(),
        userId: uuid(),
      };

      const user: User = new User(uuid(), 'testuser', 'user', uuid());

      jest
        .spyOn(usersService, 'findUser')
        .mockResolvedValue({ result: 'success', value: user });

      const domainMessage = await messageMapper.PrismaMessageToDomainMessage(
        prismaMessage,
      );

      expect(domainMessage).toBeInstanceOf(Message);
      expect(domainMessage.content).toEqual(prismaMessage.content);
      expect(domainMessage.roomId).toEqual(prismaMessage.roomId);
      expect(domainMessage.author).toBeInstanceOf(ChatUser);
    });
  });

  describe('DomainMessageToPrismaMessage', () => {
    it('should convert a DomainMessage to a PrismaMessage', () => {
      const chatUser = new ChatUser(uuid(), 'testuser', 'user', uuid());
      const domainMessage = new Message('Hello, world!', uuid(), chatUser);
      domainMessage.id = uuid();
      domainMessage.createdAt = new Date();
      domainMessage.updatedAt = new Date();

      const prismaMessage =
        messageMapper.DomainMessageToPrismaMessage(domainMessage);

      expect(prismaMessage).toBeInstanceOf(Object);
      expect(prismaMessage.content).toEqual(domainMessage.content);
      expect(prismaMessage.roomId).toEqual(domainMessage.roomId);
      expect(prismaMessage.userId).toEqual(domainMessage.author.getId());
    });
  });

  describe('userToChatUser', () => {
    it('should convert a User to a ChatUser', () => {
      const user: User = new User(uuid(), 'testuser', 'user', Role.USER);

      const chatUser = (messageMapper as any).userToChatUser(user);

      expect(chatUser).toBeInstanceOf(ChatUser);
      expect(chatUser.getId()).toEqual(user.id);
      expect(chatUser.getUsername()).toEqual(user.username);
      expect(chatUser.getRole()).toEqual(user.role);
      expect(chatUser.getRoomId()).toEqual(user.roomId);
    });
  });
});
