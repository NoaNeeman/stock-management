import React from 'react';
import { Stock } from '../utils/types';
import { InputNumber, Spin } from 'antd';
import {
  StockCardButton,
  CardContainer,
  StockCardText,
  StockCardTitle,
} from './styles';

interface StockCardProps {
  stock: Stock;
  onAddToPortfolio: (stock: Stock, quantity: number) => void;
  selectedQuantity: number;
  setSelectedQuantity: (quantity: number | null) => void;
  loading: boolean;
}

const StockCard: React.FC<StockCardProps> = ({
  stock,
  onAddToPortfolio,
  selectedQuantity,
  setSelectedQuantity,
  loading,
}) => {
  const handleAddClick = () => {
    onAddToPortfolio(stock, selectedQuantity);
  };

  return (
    <CardContainer bordered={false}>
      <StockCardTitle>{stock.symbol}</StockCardTitle>
      <StockCardText>{stock.name}</StockCardText>
      <StockCardText>{`Price: $${stock.price}`}</StockCardText>

      <InputNumber
        min={1}
        value={selectedQuantity}
        onChange={setSelectedQuantity}
        style={{ marginBottom: '10px' }}
      />

      <StockCardButton onClick={handleAddClick} disabled={loading}>
        {loading ? <Spin size="small" /> : 'Add to Portfolio'}
      </StockCardButton>
    </CardContainer>
  );
};

export default StockCard;
