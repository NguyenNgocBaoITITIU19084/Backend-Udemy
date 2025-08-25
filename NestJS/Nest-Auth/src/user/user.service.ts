import { Not, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return await this.repo.save(user);
  }

  async findByUsername(username: string) {
    return await this.repo.findOne({ where: { username } });
  }

  async updateRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.repo.createQueryBuilder().update(User).set({ hashedRefreshToken }).where("id = :id", { id: userId }).execute();
  }

  async removeRefreshToken(userId: number) {
    return await this.repo.createQueryBuilder().update(User).set({ hashedRefreshToken: "" }).where("id = :id", { id: userId }).execute();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(userId: number) {
    const user = this.repo.findOne({ where: { id: userId }, select: ['id', 'username', 'firstName', 'lastName', 'hashedRefreshToken', 'isActive', 'createdAt', 'updatedAt', 'deletedAt'] });

    if (!user) throw new NotFoundException('User not found');

    return user;

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
