import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import AppHeader from './header';
import AppSider from './sider';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../../graphql';

const AppLayout: React.FC = ({ children }) => {
  const { data } = useQuery(ME_QUERY);

  return (
    <Layout
      style={{
        backgroundColor: '#fff',
      }}
    >
      <AppHeader user={data?.me} />
      <Layout style={{ width: '90%', margin: '40px auto', background: '#fff' }}>
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
