import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AllowPermissionDto {

  @IsString()
  @IsNotEmpty()
  role_name: string

  @IsNumber()
  @IsNotEmpty()
  endpoint_id: number

  @IsBoolean()
  @IsNotEmpty()
  isAllow: boolean
}
