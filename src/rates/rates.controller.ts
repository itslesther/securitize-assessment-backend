import { Body, Controller, Get, Patch } from '@nestjs/common';
import { RatesService } from './rates.service';

@Controller('rates')
export class RatesController {
  constructor(private ratesService: RatesService) {}

  @Patch()
  async updateRate(@Body() body) {
    return this.ratesService.updateRate(body);
  }

  @Get()
  async getRates() {
    return this.ratesService.getRates();
  }
}
