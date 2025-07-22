import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class PowerService {
  supplyPower(watt: number) {
    log(`Supplying ${watt} watts of power`);
  }
}
