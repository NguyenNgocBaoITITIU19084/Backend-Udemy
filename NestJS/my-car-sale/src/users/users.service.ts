import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  createUser(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number){
    if (!id) {
      throw new NotFoundException('User ID is required');
    }
    return this.repo.findBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attr: Partial<Users>){
    const user = await this.findOne(id);

    if (!user || user.length === 0) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user[0], attr);
    return this.repo.save(user[0]);
  }

  async removeUser(id: number) {
    const user = await this.findOne(id);

    if(!user || user.length === 0) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user[0]);
  }
}
