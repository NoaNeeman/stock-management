import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useStores } from '../stores/useStores';
import {
  HeaderContainer,
  MenuContainer,
  RightSection,
  UserGreeting,
} from './styles';

const CustomHeader: React.FC = () => {
  const { authStore } = useStores();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState<string>(
    location.pathname === '/portfolio' ? '2' : '1'
  );

  useEffect(() => {
    if (location.pathname === '/portfolio') {
      setActiveMenu('2');
    } else {
      setActiveMenu('1');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '1',
      label: <Link to="/">All Stocks</Link>,
    },
    {
      key: '2',
      label: <Link to="/portfolio">My Portfolio</Link>,
    },
  ];

  return (
    <HeaderContainer>
      <MenuContainer
        theme="dark"
        mode="horizontal"
        selectedKeys={[activeMenu]}
        items={menuItems}
      />
      <RightSection>
        {authStore.isUserAuthenticated() ? (
          <Space>
            <UserGreeting>Welcome, {authStore.user?.username}</UserGreeting>
            <Button onClick={handleLogout} type="primary" ghost>
              Logout
            </Button>
          </Space>
        ) : (
          <Button type="primary" ghost onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </RightSection>
    </HeaderContainer>
  );
};

export default CustomHeader;
