import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './stocks.schema';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
  ],
  providers: [StocksService],
  controllers: [StocksController],
  exports: [MongooseModule],
})
export class StocksModule {}
