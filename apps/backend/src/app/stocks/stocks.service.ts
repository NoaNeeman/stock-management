import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock, StockDocument } from './stocks.schema';
import { ConfigService } from '@nestjs/config';
import * as cron from 'node-cron';

@Injectable()
export class StocksService implements OnModuleInit {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
    private readonly configService: ConfigService
  ) {}

  onModuleInit() {
    cron.schedule('0 */8 * * *', () => {
      this.syncStocks();
    });

    this.syncStocks();
  }

  async syncStocks(): Promise<void> {
    const apiKey = this.configService.get<string>('API_KEY');
    const apiUrl = this.configService.get<string>('API_URL');
    const response = await axios.get(`${apiUrl}/stock/list?apikey=${apiKey}`);
    const stockList = response.data.filter(
      (stock) => stock.type === 'stock' && !stock.symbol.includes('.')
    );

    for (const stock of stockList) {
      await this.stockModel.findOneAndUpdate({ symbol: stock.symbol }, stock, {
        upsert: true,
        new: true,
      });
    }
  }

  // Paginated fetch
  async getAllStocks(page: number = 1, limit: number = 20): Promise<any> {
    const skip = (page - 1) * limit;
    const totalCount = await this.stockModel.countDocuments().exec();
    const stocks = await this.stockModel.find().skip(skip).limit(limit).exec();

    return {
      stocks,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  // stock additional details (quate)
  async getStockDetails(symbol: string): Promise<Stock> {
    const apiKey = this.configService.get<string>('API_KEY');
    const apiUrl = this.configService.get<string>('API_URL');
    const apiResponse = await axios.get(
      `${apiUrl}/quote/${symbol}?apikey=${apiKey}`
    );
    const dbResponse = await this.stockModel.findOne({ symbol }).exec();
    return { ...apiResponse.data[0], ...dbResponse };
  }
}
