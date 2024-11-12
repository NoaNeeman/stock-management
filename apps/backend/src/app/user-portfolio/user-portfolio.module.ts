import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPortfolioService } from './user-portfolio.service';
import { UserPortfolioController } from './user-portfolio.controller';
import { UserPortfolio, UserPortfolioSchema } from './user-portfolio.schema';
import { StocksModule } from '../stocks/stocks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPortfolio.name, schema: UserPortfolioSchema },
    ]),
    StocksModule,
  ],
  providers: [UserPortfolioService],
  controllers: [UserPortfolioController],
})
export class UserPortfolioModule {}
