import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStores } from '../stores/useStores';
import { Input, Form } from 'antd';
import { loginUser, registerUser } from '../api';
import { notification } from 'antd';
import {
  FormTitle,
  FormWrapper,
  InputField,
  PageWrapper,
  StyledButton,
  ToggleLink,
} from './styles';

const LoginPage: React.FC = () => {
  const { authStore } = useStores();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
      const { access_token, payload } = response.data;
      authStore.login(payload, access_token);
      navigate('/');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred during login';
      notification.error({
        message: 'Login Failed',
        description: errorMessage,
      });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser({ username, password });
      const { access_token, payload } = response.data;
      authStore.login(payload, access_token);
      navigate('/');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred during registration';
      notification.error({
        message: 'Registration Failed',
        description: errorMessage,
      });
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <FormTitle>
          {isRegister ? 'Create an Account' : 'Login to Your Account'}
        </FormTitle>
        <Form onFinish={isRegister ? handleRegister : handleLogin}>
          <Form.Item label="Username" name="username" required>
            <InputField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              size="large"
            />
          </Form.Item>
          <Form.Item label="Password" name="password" required>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              size="large"
              style={{ borderRadius: '5px' }}
            />
          </Form.Item>
          <StyledButton type="primary" htmlType="submit" block size="large">
            {isRegister ? 'Register' : 'Log in'}
          </StyledButton>
        </Form>
        <ToggleLink onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? 'Already have an account? Login'
            : 'Don’t have an account? Create one'}
        </ToggleLink>
      </FormWrapper>
    </PageWrapper>
  );
};

export default LoginPage;
