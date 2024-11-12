import { makeAutoObservable } from 'mobx';
import {
  fetchUserPortfolio,
  addStockToPortfolio,
  removeStockFromPortfolio,
  updateStockQuantityInPortfolio,
} from '../api';

class UserPortfolioStore {
  userPortfolio: any[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch user's portfolio
  async fetchUserPortfolio() {
    this.loading = true;
    try {
      const portfolio = await fetchUserPortfolio();
      this.userPortfolio = portfolio.stocks || [];
    } catch (error) {
      console.error('Error fetching user portfolio:', error);
      this.userPortfolio = [];
    } finally {
      this.loading = false;
    }
  }

  // Add a stock to the user's portfolio
  async addStock(stock: any) {
    try {
      await addStockToPortfolio(stock.symbol, stock.quantity);
      await this.fetchUserPortfolio();
    } catch (error) {
      console.error('Error adding stock to portfolio:', error);
    }
  }

  // Update stock quantity in the user's portfolio
  async updateStockQuantity(stockId: string, quantity: number) {
    try {
      await updateStockQuantityInPortfolio(stockId, quantity);
      await this.fetchUserPortfolio();
    } catch (error) {
      console.error('Error updating stock quantity:', error);
    }
  }

  // Remove a stock from the user's portfolio
  async removeStock(stockId: string) {
    try {
      await removeStockFromPortfolio(stockId);
      await this.fetchUserPortfolio();
    } catch (error) {
      console.error('Error removing stock from portfolio:', error);
    }
  }
}

export default UserPortfolioStore;
