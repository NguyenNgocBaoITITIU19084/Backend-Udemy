import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AllowPermissionDto } from './dto/create-permission.dto';

import { Permission } from './entities/permission.entity';

import { RoleService } from 'src/role/role.service';
import { EndpointService } from 'src/endpoint/endpoint.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>,
    private readonly roleService: RoleService,
    private readonly endpointService: EndpointService
  ) {}

  async allow(allowPermissionDto: AllowPermissionDto) {

    const {role_name, endpoint_id, isAllow} = allowPermissionDto;

    const existedRole = await this.roleService.findOne(role_name)

    if(existedRole.name === 'admin') throw new BadRequestException()

    const permission = await this.findOne(role_name, endpoint_id)

    permission.isAllow = isAllow


    return await this.repo.save(permission);
  }

  async findOne(role_name: string, endpoint_id: number) {
    const permission = await this.repo.createQueryBuilder('permission')
        .where("permission.role_name = :role_name", {role_name})
        .andWhere("permission.endpoint_id = :endpoint_id", {endpoint_id})
        .getOne()

    if(!permission) throw new NotFoundException("permission does not existed")

    return permission
  }

 
}
