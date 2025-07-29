import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import {sign} from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserResponse } from './types/userReponse.interface';
import { CreateLoginDTO } from './dto/login-user.dto';

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

  async login(input: CreateLoginDTO) {
    const existingUser = await this.repo.findOneBy({email: input.email})

    if(!existingUser) {
      throw new UnauthorizedException("wrong email or password 1")
    }

    const isValidPassword = await bcrypt.compare(input.password, existingUser.password)

    if(!isValidPassword){
      throw new UnauthorizedException("wrong email or password 2")
    }
    return this.generateResponseUser(existingUser)
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

   generatedToken(user: User): string {
    const generatedToken =  sign({
      id: user.id,
      email: user.email,
    }, process.env.SECRECT_KEY)

    return generatedToken 
  }

   generateResponseUser(user: User):IUserResponse {
    return {
      user: {
        ...user,
        token:  this.generatedToken(user)
      }
    }
  }
}
