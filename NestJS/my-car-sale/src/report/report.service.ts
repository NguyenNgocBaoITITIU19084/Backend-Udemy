import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Report } from "./report.entity"
import { CreateReportDto } from "./dto/create-report.dto"
import { Users } from 'src/users/users.entity';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(reportDto: CreateReportDto, user: Users) {
    const report = this.repo.create(reportDto)
    report.user = user
    return await this.repo.save(report);
  }
}
