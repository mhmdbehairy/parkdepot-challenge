import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import AppHeader from './header';
import AppSider from './sider';

const AppLayout: React.FC = ({ children }) => {
  return (
    <Layout
      style={{
        backgroundColor: '#fff',
      }}
    >
      <AppHeader />
      <Layout style={{ width: '90%', margin: '40px auto' }}>
        <AppSider />
        <Content
          style={{
            padding: '0 40px',
            background: '#fff',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
