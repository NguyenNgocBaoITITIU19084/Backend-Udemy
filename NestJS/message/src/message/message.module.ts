import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repositoty';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
})
export class MessageModule {}
