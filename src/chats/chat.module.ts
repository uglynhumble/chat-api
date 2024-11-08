import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat } from './chat.entity';
import { UsersModule } from 'src/users/user.module';
import { ChatsService } from './chat.service';
import { ChatsController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule],
  providers: [ChatsService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
