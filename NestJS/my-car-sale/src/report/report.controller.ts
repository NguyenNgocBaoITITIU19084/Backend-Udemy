import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from "../guard/auth.guard"
import { ReportService } from './report.service';
import { CreateReportDto } from "./dto/create-report.dto"
import {User} from "../decorator/user.decorator"
import { Users } from 'src/users/users.entity';
import {Interceptor} from "../interceptor/interceptor"
import {ResponseReportDto} from '../report/dto/reponse-report.dto'

@Controller('report')
@Interceptor(ResponseReportDto)
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Body() createReportDto: CreateReportDto, @User() user: Users) {
    // Logic to handle report creation
    console.log("::::::::::::::",createReportDto);
    
    return await this.reportService.create(createReportDto, user)
  }
}
