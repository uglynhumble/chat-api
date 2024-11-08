import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
  ) {}

  async create(users: User[]): Promise<Chat> {
    const chat = this.chatsRepository.create({ users });
    if (chat) {
      throw new HttpException('chat already exist', HttpStatus.FOUND);
    }
    return this.chatsRepository.save(chat);
  }

  async findByUser(userId: number): Promise<Chat[]> {
    const user = this.chatsRepository.find({
      where: { users: { id: userId } },
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findById(chatId: number): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({
      where: { id: chatId },
      relations: ['users'],
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }
    return chat;
  }
}
