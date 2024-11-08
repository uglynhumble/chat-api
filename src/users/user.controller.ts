import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body('username') username: string) {
    return this.usersService.create(username);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
