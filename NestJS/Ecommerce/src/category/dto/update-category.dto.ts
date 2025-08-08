import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string
}
