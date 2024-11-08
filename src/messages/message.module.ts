import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { ChatsModule } from 'src/chats/chat.module';
import { UsersModule } from 'src/users/user.module';
import { MessagesService } from './message.service';
import { MessagesController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ChatsModule, UsersModule],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
