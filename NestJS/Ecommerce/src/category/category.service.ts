import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly repo: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category()

    Object.assign(category, createCategoryDto)

    return await this.repo.save(category)
  }

  async findAll() {
    const category = await this.repo.find({relations: {parent: true, children: true}});

    if(!category) throw new NotFoundException("there is no category")

    return category
  }

  async findOne(id: number) {
    if(!id) throw new BadRequestException('missing field')

    const category = await this.repo.findOne({where: {id}, relations: {parent: true, children: true}});
    
    if(!category) throw new NotFoundException("there is no category")
    
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if (id === undefined || id === null) throw new BadRequestException('missing field');

    const category = await this.repo.findOne({ where: { id } });

    if (!category) throw new NotFoundException('there is no category');

    Object.assign(category, updateCategoryDto);

    return await this.repo.save(category);
  }

  async remove(id: number) {
    if(!id) throw new BadRequestException('missing field')

    const category = await this.repo.findOne({where: {id}, relations: {children: true, parent: true}});

    if(!category) throw new NotFoundException("there is no category")
    
    return await this.repo.softRemove(category)
  }
}
