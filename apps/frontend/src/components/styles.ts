import { Card, Button, Menu } from 'antd';
import styled from 'styled-components';
import { SeparationLineProps } from './separationLine';

/**------CustomHeader------- */

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #001529; /* Ant Design's dark header color */
`;

export const MenuContainer = styled(Menu)`
  flex: 1;
  background: none;
  border: none;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const UserGreeting = styled.span`
  color: #f0f0f0;
  font-size: 14px;
  font-weight: 400;
  font-family: sans-serif;
  margin-right: 12px;
  text-transform: capitalize;
`;

/**------------------------- */

/**----SeparationLine------ */

export const Line = styled.div<SeparationLineProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.thickness || '1px'};
  background-color: ${(props) => props.color || '#e8e8e8'};
  margin: ${(props) => props.margin || '10px 0'};
`;

/**------------------------- */
/**----StockDetailsModal---- */

export const ModalContent = styled.div`
  .ant-descriptions {
    margin-top: 16px;
  }

  .ant-descriptions-item-label {
    font-weight: bold;
    color: #555;
  }

  .ant-descriptions-item-content {
    color: #333;
  }
`;

/**------------------------- */
/**--------------Cards------ */

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-bottom: 10px;
  cursor: pointer; /* Indicate that the title is clickable */
  &:hover {
    color: #1890ff; /* Change color on hover to highlight it as clickable */
  }
`;

export const CardText = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const PriceText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

export const QuantitySection = styled.div`
  margin-top: 20px;
  box-sizing: border-box;
`;

export const InputWrapper = styled.div`
  margin-bottom: 12px;
`;

export const ButtonBase = styled(Button)`
  width: 100%;
  border-radius: 6px;
  padding: 8px 0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 1.5;

  &:focus {
    outline: none;
  }
`;

export const UpdateButton = styled(ButtonBase)`
  background-color: #52c41a;
  color: white;

  &:hover {
    background-color: #4caf50;
    border-color: #4caf50;
  }

  &:disabled {
    background-color: white;
    border-color: transparent;

    &:hover {
      border-color: transparent;
    }
  }

  .ant-spin {
    margin-right: 8px;
  }
`;

export const RemoveButton = styled(ButtonBase)`
  background-color: #f5222d;
  color: white;
  margin-top: 12px;

  &:hover {
    background-color: #d41c1c;
    border-color: #d41c1c;
  }

  &:disabled {
    background-color: white;
    border-color: transparent;

    &:hover {
      border-color: transparent;
    }
  }

  .ant-spin {
    margin-right: 8px;
  }
`;

export const CardContainer = styled(Card)`
  width: 240px;
  margin: 10px;
  border-radius: 8px;
  background-color: #ffffff; /* Lighter background for a clean look */
  color: #333; /* Darker text color for readability */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0; /* Light border for definition */

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px); /* Subtle lift effect on hover */
  }
`;

export const StockCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #222; /* Darker title for emphasis */
  margin: 0 0 8px;
`;

export const StockCardText = styled.p`
  color: #666; /* Soft gray text for details */
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.5; /* Improve readability */
`;

export const StockCardButton = styled(Button)`
  width: 100%;
  background-color: #001529;
  color: white;
  border: 2px solid #001529;
  border-radius: 6px;
  padding: 10px;
  font-weight: 600;

  &:hover {
    background-color: #45a049;
    border-color: #45a049;
  }

  &:disabled {
    background-color: white;
    border-color: transparent;

    &:hover {
      border-color: transparent;
    }
  }

  .ant-spin {
    margin-right: 8px;
  }
`;
