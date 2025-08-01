import { Injectable } from '@nestjs/common';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { Endpoint } from './entities/endpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EndpointService {
  constructor(@InjectRepository(Endpoint) private readonly repo: Repository<Endpoint>) {}

  async create(createEndpointDto: CreateEndpointDto) {
    const endPoint = new Endpoint()

    Object.assign(endPoint, createEndpointDto)

    return await this.repo.save(endPoint);
  }
  
  async getAllEndpoints() {
    return await this.repo.find()
  }
}
