import { Controller, Post, Param, Body, Get, Delete } from '@nestjs/common';
import { UserPortfolioService } from './user-portfolio.service';

@Controller('user-portfolio')
export class UserPortfolioController {
  constructor(private readonly userPortfolioService: UserPortfolioService) {}

  // Add stock to a user's portfolio
  @Post(':userId/stocks')
  async addStock(
    @Param('userId') userId: string,
    @Body() stock: { stockId: string; quantity: number }
  ) {
    return this.userPortfolioService.addStock(
      userId,
      stock.stockId,
      stock.quantity
    );
  }

  // Get a user's portfolio, including stock data
  @Get(':userId')
  async getPortfolio(@Param('userId') userId: string) {
    return this.userPortfolioService.getPortfolio(userId);
  }

  // Remove stock from a user's portfolio
  @Delete(':userId/stocks/:stockId')
  async removeStock(
    @Param('userId') userId: string,
    @Param('stockId') stockId: string
  ) {
    return this.userPortfolioService.removeStock(userId, stockId);
  }

  // Update the quantity of a stock in the user's portfolio
  @Post(':userId/stocks/:stockId')
  async updateStockQuantity(
    @Param('userId') userId: string,
    @Param('stockId') stockId: string,
    @Body() quantity: { quantity: number }
  ) {
    return this.userPortfolioService.updateStockQuantity(
      userId,
      stockId,
      quantity.quantity
    );
  }
}
