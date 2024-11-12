import React, { useState } from 'react';
import { Input, Spin } from 'antd';
import SeparationLine from './separationLine';
import {
  CardContainer,
  CardText,
  CardTitle,
  InputWrapper,
  PriceText,
  QuantitySection,
  RemoveButton,
  UpdateButton,
} from './styles';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  quantity: number;
  exchange: string;
  exchangeShortName: string;
  id: string;
}

interface UserPortfolioCardProps {
  stock: Stock;
  onRemoveFromPortfolio: (stock: Stock) => void;
  onUpdateQuantity: (quantity: number) => void;
  loadingState: { update: boolean; remove: boolean };
  onClickCard: () => void;
}

const UserPortfolioCard: React.FC<UserPortfolioCardProps> = ({
  stock,
  onRemoveFromPortfolio,
  onUpdateQuantity,
  loadingState,
  onClickCard,
}) => {
  const [editingQuantity, setEditingQuantity] = useState<number | null>(null);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingQuantity(Number(e.target.value));
  };

  const handleUpdateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingQuantity !== null) {
      onUpdateQuantity(editingQuantity);
      setEditingQuantity(null);
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveFromPortfolio(stock);
  };

  return (
    <CardContainer bordered={false}>
      <CardTitle onClick={onClickCard}>{stock.symbol}</CardTitle>
      <CardText>{stock.name}</CardText>
      <PriceText>{`Price: $${stock.price.toFixed(2)}`}</PriceText>
      <QuantitySection>
        <InputWrapper>
          <Input
            type="number"
            value={editingQuantity !== null ? editingQuantity : stock.quantity}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
            style={{ width: '100%' }}
          />
        </InputWrapper>
        <UpdateButton
          onClick={handleUpdateClick}
          disabled={loadingState.update}
        >
          {loadingState.update ? <Spin size="small" /> : 'Update'}
        </UpdateButton>
      </QuantitySection>
      <SeparationLine color="#e8e8e8" thickness="1px" margin="12px 0" />
      <RemoveButton onClick={handleRemoveClick} disabled={loadingState.remove}>
        {loadingState.remove ? <Spin size="small" /> : 'Remove'}
      </RemoveButton>
    </CardContainer>
  );
};

export default UserPortfolioCard;
