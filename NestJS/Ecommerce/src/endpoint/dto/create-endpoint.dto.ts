import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { HttpMethod } from '../entities/endpoint.entity'

export class CreateEndpointDto {

  @IsString()
  @IsNotEmpty()
  url: string

  @IsString()
  @IsNotEmpty()
  @IsEnum(HttpMethod)
  method: HttpMethod
}
