import { Injectable } from '@nestjs/common';

import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private readonly powerService: PowerService) {}

  readData() {
    this.powerService.supplyPower(50);
    console.log('Reading data from disk...');
  }

  writeData() {
    this.powerService.supplyPower(70);
    console.log('Writing data to disk...');
  }
}
