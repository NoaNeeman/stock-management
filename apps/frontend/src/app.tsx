import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomHeader from './components/customHeader';
import LoginPage from './pages/LoginPage';
import StockListPage from './pages/StockListPage';
import PortfolioPage from './pages/UserPortfolioPage';
import PrivateRoute from './components/privateRoute';
import { AppWrapper } from './styles/globalStyles';

const App: React.FC = () => {
  return (
    <Router>
      <AppWrapper>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <>
                <CustomHeader />
                <PrivateRoute element={<StockListPage />} />
              </>
            }
          />
          <Route
            path="/portfolio"
            element={
              <>
                <CustomHeader />
                <PrivateRoute element={<PortfolioPage />} />
              </>
            }
          />
        </Routes>
      </AppWrapper>
    </Router>
  );
};

export default App;
