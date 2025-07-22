import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';

import { MessageService } from './message.service';
import { MessageDTO } from './dtos/message.dto';

@Controller('message')
export class MessageController {
  constructor(public messageService: MessageService) {}

  @Post()
  createMessage(@Body() body: MessageDTO)  {
    return this.messageService.createMessage(body.message);
  }

  @Get()
  findAllMessages() {
    return this.messageService.findAllMessages();
  }

  @Get(':id')
  async findOneMessage(@Param('id') id: string) {
    const message = await this.messageService.finOneMessage(id);
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    } 
    return message
  }
}
