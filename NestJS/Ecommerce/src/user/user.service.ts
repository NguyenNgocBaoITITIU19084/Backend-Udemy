import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

import { hashAsync } from "../utils/hash";
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly roleService: RoleService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.findOne('user')

    const user = new User()

    const hashedPassword = await hashAsync(createUserDto.password)

    Object.assign(user, {...createUserDto, password: hashedPassword, role})

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
