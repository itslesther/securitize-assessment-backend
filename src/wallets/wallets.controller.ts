import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Post()
  async newWallet(@Body() body) {
    return this.walletsService.newWallet(body);
  }

  @Get()
  async getWallets(@Query() query) {
    return this.walletsService.getWallets(query);
  }

  @Get(':address')
  async getWallet(@Param() params) {
    return this.walletsService.getWallet(params);
  }

  @Patch(':address/favorite')
  async setFavorite(@Body() body) {
    return this.walletsService.setFavorite(body);
  }
}
