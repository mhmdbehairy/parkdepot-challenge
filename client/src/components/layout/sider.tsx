import React from 'react';
import styled from '@emotion/styled';
import { Layout, Menu } from 'antd';
import { Link, useLocation, withRouter } from 'react-router-dom';

const { Sider } = Layout;
const { Item } = Menu;

const SiderContainer = styled.div`
  .app-sider {
    background-color: #fff;
  }

  .side-menu {
    background-color: #f2f2f2;
    border-right: 0;
  }
`;

const AppSider: React.FC = () => {
  const location = useLocation();

  return (
    <SiderContainer>
      <Sider className="app-sider" width="220">
        <Menu
          mode="inline"
          className="side-menu"
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
        >
          <Item className="menuItem" key="/">
            <Link to="/">Home</Link>
          </Item>
          <Item className="menuItem" key="/whitelist">
            <Link to="/whitelist">WhiteList</Link>
          </Item>
        </Menu>
      </Sider>
    </SiderContainer>
  );
};

export default withRouter(AppSider);
