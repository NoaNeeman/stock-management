import React from 'react';
import { Modal, Spin, Descriptions } from 'antd';
import { ModalContent } from './styles';

interface StockDetailsModalProps {
  visible: boolean;
  stockDetails: any;
  onClose: () => void;
}

const StockDetailsModal: React.FC<StockDetailsModalProps> = ({
  visible,
  stockDetails,
  onClose,
}) => {
  return (
    <Modal
      title="Stock Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {stockDetails ? (
        <ModalContent>
          <Descriptions
            column={1}
            bordered
            size="middle"
            labelStyle={{ fontWeight: 'bold', color: '#555' }}
            contentStyle={{ color: '#333' }}
          >
            <Descriptions.Item label="Symbol">
              {stockDetails.symbol}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {stockDetails.name}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              ${stockDetails.price.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Exchange">
              {stockDetails.exchange}
            </Descriptions.Item>
            <Descriptions.Item label="Change Percentage">
              {stockDetails.changesPercentage}%
            </Descriptions.Item>
            <Descriptions.Item label="Day Low">
              ${stockDetails.dayLow}
            </Descriptions.Item>
            <Descriptions.Item label="Day High">
              ${stockDetails.dayHigh}
            </Descriptions.Item>
            <Descriptions.Item label="Volume">
              {stockDetails.volume}
            </Descriptions.Item>
          </Descriptions>
        </ModalContent>
      ) : (
        <Spin size="large" />
      )}
    </Modal>
  );
};

export default StockDetailsModal;
