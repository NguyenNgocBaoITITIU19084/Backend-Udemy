import { PartialType } from '@nestjs/mapped-types';
import { CreateEndpointDto } from './create-endpoint.dto';
import { HttpMethod } from '../entities/endpoint.entity';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class UpdateEndpointDto extends PartialType(CreateEndpointDto) {
  @IsString()
  @IsNotEmpty()
  url: string

  @IsString()
  @IsNotEmpty()
  @IsEnum(HttpMethod)
  method: HttpMethod
}
