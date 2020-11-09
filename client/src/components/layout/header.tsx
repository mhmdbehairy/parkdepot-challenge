import React from 'react';
import { Layout, Button } from 'antd';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header
      style={{
        height: 80,
        width: '95%',
        margin: 'auto',
        display: 'flex',
      }}
    >
      <Button
        type="link"
        style={{ height: '50%', padding: 0, transform: 'translateY(50%)' }}
      >
        Logout
      </Button>
    </Header>
  );
};

export default AppHeader;
