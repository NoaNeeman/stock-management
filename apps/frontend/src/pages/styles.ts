import { Button, Input } from 'antd';
import styled from 'styled-components';

/**----LoginPage------ */

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fafafa;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Modern font */
`;

export const FormWrapper = styled.div`
  background: #ffffff;
  padding: 40px 50px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  transition: box-shadow 0.3s ease;
`;

export const FormTitle = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  font-size: 28px;
  color: #2c3e50;
  font-weight: 600;
`;

export const ToggleLink = styled.p`
  text-align: center;
  margin-top: 25px;
  color: #3498db;
  font-size: 15px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #3498db;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  font-weight: 500;

  &:hover {
    background-color: #2980b9;
  }

  &:focus {
    background-color: #2980b9;
    color: white;
  }
`;

export const InputField = styled(Input)`
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover,
  &:focus {
    border-color: #3498db;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(0, 0, 0, 0.15);
  }
`;

/**-------------------------- */
/**----StockListPage--------- */

export const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export const StockCenteredRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin: 20px 0;
  color: #333;
  font-family: sans-serif;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingPortfolioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

/**---UserPortfolioPage---- */

export const PortfolioCenteredRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  font-family: sans-serif;
  font-size: 1.2rem;
  color: #888;
  font-weight: 500;
  margin-top: 20px;
`;
