import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from "./dto/create-user.dto"
import { ResponseUserDto } from './dto/response-user.dto'

import { hashAsync } from '../utils/hashString'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>) {}

  async create(userInput: CreateUserDto) {
    
    const { username, password } = userInput
    const existingUser = await this.repo.findOneBy({ username })

    if(existingUser) {
      throw new BadRequestException("Username is in used")
    }

    // hash password 
    const hashedPassword = hashAsync(password)

    const userInstance = this.repo.create({username, password: hashedPassword})

    return await this.repo.save(userInstance)
  }
}
