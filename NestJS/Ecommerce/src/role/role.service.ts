import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly repo: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = new Role()

    Object.assign(role, createRoleDto)

    return await this.repo.save(role)
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(name: string) {

    if(!name) throw new BadRequestException('name of role is required')
    
    const role = await this.repo.findOne({where: {name}})

    if(!role) throw new NotFoundException("no role existed")

    return role;
  }

  async update(name: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(name)

    role.description = updateRoleDto.description;

    return await this.repo.save(role);
  }

  async remove(name: string) {
    const role = await this.findOne(name)

    role.isActive = false

    return await this.repo.save(role);
  }
}
