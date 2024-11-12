// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form } from 'antd';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Registration logic (can be expanded with an API call)
    console.log('User registered:', { username, password });
    navigate('/login'); // Redirect to the login page after successful registration
  };

  return (
    <div>
      <h1>Register</h1>
      <Form onFinish={handleRegister}>
        <Form.Item label="Username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Item>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
