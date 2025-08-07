import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { EndpointService } from './endpoint.service';
import { getEndPoint } from 'src/_utils/get-endpoint';
import { Router } from 'express';

@Controller('endpoint')
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}

  @Post()
  create(@Body() createEndpointDto: CreateEndpointDto) {
    return this.endpointService.create(createEndpointDto);
  }

  @Get('all')
  getEndpoints() {
    return this.endpointService.getAllEndpoints()
  }

}
