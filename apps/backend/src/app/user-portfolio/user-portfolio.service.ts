import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPortfolio } from './user-portfolio.schema';
import { Stock } from '../stocks/stocks.schema';

@Injectable()
export class UserPortfolioService {
  constructor(
    @InjectModel(UserPortfolio.name)
    private readonly userPortfolioModel: Model<UserPortfolio>,
    @InjectModel(Stock.name)
    private readonly stockModel: Model<Stock>
  ) {}

  // Create or update portfolio with stock and quantity
  async addStock(userId: string, stockId: string, quantity: number) {
    const stock = await this.stockModel.findOne({ symbol: stockId });
    if (!stock) {
      throw new Error('Stock not found');
    }

    let portfolio = await this.userPortfolioModel.findOne({ userId });
    if (!portfolio) {
      portfolio = new this.userPortfolioModel({ userId, stocks: [] });
    }

    const existingStock = portfolio.stocks.find(
      (item) => item.stock.toString() === stock._id.toString()
    );

    if (existingStock) {
      existingStock.quantity += quantity;
    } else {
      portfolio.stocks.push({
        stock: stock._id,
        quantity,
      });
    }

    return portfolio.save();
  }

  // Get a user's portfolio, including stock data
  async getPortfolio(userId: string) {
    const portfolio = await this.userPortfolioModel
      .findOne({ userId })
      .populate('stocks.stock') // Populate the stock data with full stock details
      .exec();

    if (!portfolio) {
      return { stocks: [] };
    }

    return portfolio;
  }

  // Remove a stock from the portfolio
  async removeStock(userId: string, stockId: string) {
    const portfolio = await this.userPortfolioModel.findOne({ userId });
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    portfolio.stocks = portfolio.stocks.filter(
      (stock) => stock.stock.toString() !== stockId
    );

    return portfolio.save();
  }

  // Update stock quantity
  async updateStockQuantity(userId: string, stockId: string, quantity: number) {
    const portfolio = await this.userPortfolioModel.findOne({ userId });
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const stock = portfolio.stocks.find(
      (item) => item.stock.toString() === stockId
    );
    if (stock) {
      stock.quantity = quantity;
    } else {
      throw new Error('Stock not found in portfolio');
    }

    return portfolio.save();
  }
}
