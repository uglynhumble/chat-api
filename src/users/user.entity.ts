import { Chat } from 'src/chats/chat.entity';
import { Message } from 'src/messages/message.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;
}
