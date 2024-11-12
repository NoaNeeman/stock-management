import React, { useEffect } from 'react';
import { useStores } from '../stores/useStores';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { authStore } = useStores();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.isUserAuthenticated()) {
      navigate('/login');
    }
  }, [authStore, navigate]);

  if (!authStore.isUserAuthenticated()) {
    return <Spin size="large" />;
  }

  return element;
};

export default PrivateRoute;
