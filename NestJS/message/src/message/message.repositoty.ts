import { Injectable } from "@nestjs/common";
import { writeFile, readFile } from "fs/promises";

@Injectable()
export class MessageRepository {

  async findOne(id: string) {
    const messages = await readFile('message.json', 'utf-8');
    const parsedMessages = JSON.parse(messages);
    return parsedMessages[id] || null;
  }

  async findAll() {
    const messages = await readFile('message.json', 'utf-8');
    const parsedMessages = JSON.parse(messages);

    return parsedMessages
  }

  async create(message: string) {
    const messages = await readFile('message.json', 'utf-8');
    const parsedMessages = JSON.parse(messages);

    const id = Math.floor(Math.random() * 999)

    parsedMessages[id] = {id, message}

    await writeFile('message.json', JSON.stringify(parsedMessages));
  }
}