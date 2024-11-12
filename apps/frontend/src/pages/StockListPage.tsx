import React, { useEffect, useState } from 'react';
import { Spin, Alert, Button, Pagination, notification } from 'antd';
import StockCard from '../components/stockCard';
import { useStores } from '../stores/useStores';
import { observer } from 'mobx-react';
import {
  StockCenteredRow,
  LoadingContainer,
  PaginationContainer,
  Title,
  EmptyMessage,
  CenteredWrapper,
} from './styles';

const StockListPage: React.FC = observer(() => {
  const { stockStore, userPortfolioStore } = useStores();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (stockStore.stocks.length === 0 && !stockStore.loading) {
      stockStore.fetchStocks();
    }
  }, [stockStore]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stockStore.currentPage]);

  const handleAddToPortfolio = (stock: any, quantity: number): void => {
    if (quantity > 0) {
      setLoadingState((prev) => ({ ...prev, [stock.symbol]: true }));

      userPortfolioStore
        .addStock({ ...stock, quantity })
        .then(() => {
          notification.success({
            message: 'Stock Added',
            description: `${stock.symbol} has been successfully added to your portfolio.`,
            placement: 'topRight',
            duration: 2,
          });
        })
        .catch((error) => {
          notification.error({
            message: 'Failed to Add Stock',
            description:
              error.message || 'An error occurred while adding the stock.',
            placement: 'topRight',
            duration: 2,
          });
        })
        .finally(() => {
          setLoadingState((prev) => ({ ...prev, [stock.symbol]: false }));
        });
    } else {
      notification.error({
        message: 'Invalid Quantity',
        description: 'Please select a valid quantity.',
        placement: 'topRight',
        duration: 2,
      });
    }
  };

  const handleForceRefresh = () => stockStore.forceRefresh();

  const handleQuantityChange = (symbol: string, value: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [symbol]: value,
    }));
  };

  const renderStockListContent = () => {
    if (stockStore.loading)
      return (
        <LoadingContainer>
          <Spin size="large" tip="Loading stocks..." />
        </LoadingContainer>
      );

    return stockStore.stocks.length === 0 ? (
      <CenteredWrapper>
        <EmptyMessage>No stocks available</EmptyMessage>
        <Button type="primary" onClick={handleForceRefresh}>
          Refresh Now
        </Button>
      </CenteredWrapper>
    ) : (
      <>
        <StockCenteredRow>
          {stockStore.stocks.map((stock: any) => (
            <div key={stock.symbol} style={{ margin: '10px' }}>
              <StockCard
                stock={stock}
                selectedQuantity={quantities[stock.symbol] || 1}
                setSelectedQuantity={(value: number | null) =>
                  handleQuantityChange(stock.symbol, value ?? 1)
                }
                onAddToPortfolio={handleAddToPortfolio}
                loading={loadingState[stock.symbol] || false}
              />
            </div>
          ))}
        </StockCenteredRow>

        <PaginationContainer>
          <Pagination
            current={stockStore.currentPage}
            total={stockStore.totalPages * stockStore.pageSize}
            pageSize={stockStore.pageSize}
            onChange={async (page) => {
              stockStore.currentPage = page;
              await stockStore.fetchStocks();
            }}
          />
        </PaginationContainer>
      </>
    );
  };

  return (
    <div>
      <Title>All Stocks</Title>
      {renderStockListContent()}
    </div>
  );
});

export default StockListPage;
