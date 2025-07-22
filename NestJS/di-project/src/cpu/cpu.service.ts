import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private readonly powerService: PowerService) {}

  processData(data: string) {
    this.powerService.supplyPower(100); // Example wattage
    console.log(`Processing data: ${data}`);
  }
}
