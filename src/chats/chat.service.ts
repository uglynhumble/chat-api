import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.chatsRepository.save(chat);
  }

  findByUser(userId: number): Promise<Chat[]> {
    return this.chatsRepository.find({ where: { users: { id: userId } } });
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
