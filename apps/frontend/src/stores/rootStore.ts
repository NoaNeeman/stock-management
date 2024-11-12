import AuthStore from './authStore';
import StockStore from './stockStore';
import UserPortfolioStore from './userPortfolioStore';

class RootStore {
  stockStore = new StockStore();
  userPortfolioStore = new UserPortfolioStore();
  authStore = new AuthStore();
}

export default RootStore;
