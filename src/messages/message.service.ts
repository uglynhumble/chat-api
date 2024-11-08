import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Chat } from '../chats/chat.entity';
import { User } from '../users/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(text: string, chat: Chat, author: User): Promise<Message> {
    const message = this.messagesRepository.create({ text, chat, author });
    return this.messagesRepository.save(message);
  }

  findByChat(chatId: number): Promise<Message[]> {
    return this.messagesRepository.find({ where: { chat: { id: chatId } } });
  }
}
