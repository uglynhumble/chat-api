import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatsService } from './chat.service';
import { UsersService } from 'src/users/user.service';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body('userIds') userIds: number[]) {
    const users = await Promise.all(
      userIds.map((id) => this.usersService.findById(id)),
    );
    return this.chatsService.create(users);
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    return this.chatsService.findByUser(userId);
  }
}
