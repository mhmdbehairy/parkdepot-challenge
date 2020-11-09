import React from 'react';

import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const { Sider } = Layout;
const { Item } = Menu;

const AppSider: React.FC = () => {
  return (
    <Sider width="210" style={{ backgroundColor: '#fff' }}>
      <Menu
        mode="inline"
        style={{ backgroundColor: '#F2F2F2', borderRight: 0 }}
      >
        <Item className="menuItem" key="1">
          <Link to="">Home</Link>
        </Item>
        <Item className="menuItem" key="2">
          <Link to="">WhiteList</Link>
        </Item>
        <Item className="menuItem" key="3">
          <Link to="">Users</Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(AppSider);
