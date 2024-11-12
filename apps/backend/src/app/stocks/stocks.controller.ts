import { Controller, Get, Query, Param } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  // Fetch stocks with pagination
  @Get()
  async getAllStocks(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    return this.stocksService.getAllStocks(page, limit);
  }

  // Sync stocks from the API to DB (to be called on a schedule or manually)
  @Get('sync')
  async syncStocks() {
    await this.stocksService.syncStocks();
    return { message: 'Stock data synced successfully' };
  }

  // Fetch details of a specific stock by its symbol
  @Get(':symbol')
  async getStockDetails(@Param('symbol') symbol: string) {
    return this.stocksService.getStockDetails(symbol);
  }
}
