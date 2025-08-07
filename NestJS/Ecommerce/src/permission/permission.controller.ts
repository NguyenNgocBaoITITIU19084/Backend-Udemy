import { Body, Controller, Post } from '@nestjs/common';
import { AllowPermissionDto } from './dto/create-permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('allow')
  create(@Body() createPermissionDto: AllowPermissionDto) {
    return this.permissionService.allow(createPermissionDto);
  }

  
}
