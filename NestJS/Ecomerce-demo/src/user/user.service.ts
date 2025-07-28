import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { IUserResponse } from './types/userReponse.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const existingUser = await this.repo.findOneBy({email: createUserDto.email})

    if(existingUser){
      throw new BadRequestException("Email is in use")
    }

    const user = plainToClass(User, createUserDto)
    
    await this.repo.save(user);

    return await this.generateResponseUser(user)
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generateResponseUser(user: User):IUserResponse {
    return {
      user: {
        ...user,
        token: ''
      }
    }
  }
}
