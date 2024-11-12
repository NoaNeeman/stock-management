import { makeAutoObservable, runInAction } from 'mobx';
import { fetchStocks, addStockToPortfolio } from '../api';

class StockStore {
  stocks: any[] = [];
  loading: boolean = false;
  lastFetchTime: number = 0;
  cacheExpiryTime: number = 3600000; // 1 hour cache expiry
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 20;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  loadFromStorage() {
    const savedStocks = sessionStorage.getItem('stocks');
    const lastFetchTime = sessionStorage.getItem('lastFetchTime');
    const currentPage = sessionStorage.getItem('currentPage');
    const totalPages = sessionStorage.getItem('totalPages');

    if (savedStocks && lastFetchTime && currentPage && totalPages) {
      this.stocks = JSON.parse(savedStocks);
      this.lastFetchTime = parseInt(lastFetchTime);
      this.currentPage = parseInt(currentPage);
      this.totalPages = parseInt(totalPages);
    }
  }

  saveToStorage() {
    sessionStorage.setItem('stocks', JSON.stringify(this.stocks));
    sessionStorage.setItem('lastFetchTime', String(this.lastFetchTime));
    sessionStorage.setItem('currentPage', String(this.currentPage));
    sessionStorage.setItem('totalPages', String(this.totalPages));
  }

  // Fetch stocks with pagination and cache handling
  async fetchStocks(forceRefresh: boolean = false) {
    const now = Date.now();

    // If force refresh is required, bypass the cache expiry check
    if (
      this.loading ||
      (forceRefresh && now - this.lastFetchTime < this.cacheExpiryTime)
    ) {
      return;
    }

    this.loading = true;
    try {
      const data = await fetchStocks(this.currentPage, this.pageSize);
      runInAction(() => {
        this.stocks = data.stocks;
        this.totalPages = data.totalPages;
        this.lastFetchTime = now;
        this.saveToStorage();
      });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  // Add stock to portfolio
  async addStock(stock: any) {
    try {
      await addStockToPortfolio(stock.symbol, stock.quantity);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Force refresh by clearing cache and fetching fresh data
  async forceRefresh() {
    this.stocks = [];
    this.lastFetchTime = 0;
    this.currentPage = 1;
    await this.fetchStocks(true);
  }
}

export default StockStore;
