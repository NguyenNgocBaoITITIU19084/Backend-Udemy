import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User()

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);  

    Object.assign(user, {...createUserDto, password: hashedPassword})

    return await this.repo.save(user)
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {

    if(!username) {
      throw new BadRequestException("Email is Empty")
    }

    return await this.repo.findOneBy({username})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
