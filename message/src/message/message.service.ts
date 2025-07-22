import { Injectable } from '@nestjs/common';

import { MessageRepository } from './message.repositoty';

@Injectable()
export class MessageService {
  constructor(public messageRepository: MessageRepository) {}

  finOneMessage(id: string) {
    return this.messageRepository.findOne(id);
  }

  findAllMessages() {
    return this.messageRepository.findAll();
  }

  createMessage(message: string) {
    return this.messageRepository.create(message);
  }

}
