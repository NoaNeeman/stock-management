import React, { useEffect, useState } from 'react';
import { Spin, notification } from 'antd';
import { useStores } from '../stores/useStores';
import { observer } from 'mobx-react-lite';
import {
  EmptyMessage,
  LoadingPortfolioContainer,
  PortfolioCenteredRow,
  Title,
} from './styles';
import UserPortfolioCard from '../components/userPortfolioCard';
import { fetchStockDetails } from '../api';
import StockDetailsModal from '../components/stockDetailsModal';

const UserPortfolioPage: React.FC = observer(() => {
  const { userPortfolioStore } = useStores();
  const [loadingState, setLoadingState] = useState<{
    [key: string]: { update: boolean; remove: boolean };
  }>({});
  const [selectedStockDetails, setSelectedStockDetails] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    userPortfolioStore.fetchUserPortfolio();
  }, [userPortfolioStore]);

  const handleRemoveFromPortfolio = (stockId: string) => {
    setLoadingState((prev) => ({
      ...prev,
      [stockId]: { ...prev[stockId], remove: true },
    }));

    userPortfolioStore
      .removeStock(stockId)
      .then(() => {
        notification.success({
          message: 'Stock Removed',
          description:
            'The stock has been successfully removed from your portfolio.',
          placement: 'topRight',
          duration: 2,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Failed to Remove Stock',
          description: 'An error occurred while removing the stock.',
          placement: 'topRight',
          duration: 2,
        });
      })
      .finally(() => {
        setLoadingState((prev) => ({
          ...prev,
          [stockId]: { ...prev[stockId], remove: false },
        }));
      });
  };

  const handleUpdateQuantity = (
    stockId: string,
    quantity: number,
    originalQuantity: number
  ) => {
    setLoadingState((prev) => ({
      ...prev,
      [stockId]: { ...prev[stockId], update: true },
    }));

    const updatedPortfolio = userPortfolioStore.userPortfolio.map((stock) =>
      stock.stock._id === stockId ? { ...stock, quantity } : stock
    );
    userPortfolioStore.userPortfolio = updatedPortfolio;

    userPortfolioStore
      .updateStockQuantity(stockId, quantity)
      .then(() => {
        notification.success({
          message: 'Quantity Updated',
          description: `The quantity for the stock has been updated to ${quantity}.`,
          placement: 'topRight',
          duration: 2,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Failed to Update Quantity',
          description: 'An error occurred while updating the quantity.',
          placement: 'topRight',
          duration: 2,
        });

        const revertedPortfolio = userPortfolioStore.userPortfolio.map(
          (stock) =>
            stock.stock._id === stockId
              ? { ...stock, quantity: originalQuantity }
              : stock
        );
        userPortfolioStore.userPortfolio = revertedPortfolio;
      })
      .finally(() => {
        setLoadingState((prev) => ({
          ...prev,
          [stockId]: { ...prev[stockId], update: false },
        }));
      });
  };

  const handleCardClick = async (symbol: string) => {
    try {
      const stockDetails = await fetchStockDetails(symbol);
      setSelectedStockDetails(stockDetails);
      setIsModalVisible(true);
    } catch (error) {
      notification.error({
        message: 'Failed to Fetch Stock Details',
        description: 'An error occurred while fetching stock details.',
        placement: 'topRight',
        duration: 2,
      });
    }
  };

  const renderPortfolioContent = () => {
    const { userPortfolio, loading } = userPortfolioStore;

    if (loading) {
      return (
        <LoadingPortfolioContainer>
          <Spin size="large" tip="Loading..." />
        </LoadingPortfolioContainer>
      );
    }

    return userPortfolio.length === 0 ? (
      <EmptyMessage>Currently empty.</EmptyMessage>
    ) : (
      <PortfolioCenteredRow>
        {userPortfolio.map((stock) => (
          <div
            key={stock.stock._id}
            style={{ width: '250px', marginBottom: '20px' }}
          >
            <UserPortfolioCard
              stock={{ ...stock.stock, quantity: stock.quantity }}
              onRemoveFromPortfolio={() =>
                handleRemoveFromPortfolio(stock.stock._id)
              }
              onUpdateQuantity={(quantity: number) =>
                handleUpdateQuantity(stock.stock._id, quantity, stock.quantity)
              }
              loadingState={
                loadingState[stock.stock._id] || {
                  update: false,
                  remove: false,
                }
              }
              onClickCard={() => handleCardClick(stock.stock.symbol)}
            />
          </div>
        ))}
      </PortfolioCenteredRow>
    );
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedStockDetails(null);
  };

  return (
    <div>
      <Title>My Portfolio</Title>
      {renderPortfolioContent()}
      <StockDetailsModal
        visible={isModalVisible}
        stockDetails={selectedStockDetails}
        onClose={handleModalClose}
      />
    </div>
  );
});

export default UserPortfolioPage;
