import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessagesService } from './message.service';
import { ChatsService } from 'src/chats/chat.service';
import { UsersService } from 'src/users/user.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Body()
    {
      text,
      chatId,
      authorId,
    }: {
      text: string;
      chatId: number;
      authorId: number;
    },
  ) {
    const chat = await this.chatsService.findById(chatId);
    const author = await this.usersService.findById(authorId);
    return this.messagesService.create(text, chat, author);
  }

  @Get(':chatId')
  async findByChat(@Param('chatId') chatId: number) {
    return this.messagesService.findByChat(chatId);
  }
}
