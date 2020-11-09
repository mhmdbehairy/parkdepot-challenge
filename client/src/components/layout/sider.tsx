import React, { useState, useEffect, useContext } from 'react';

import { Layout, Menu } from 'antd';
import styled from '@emotion/styled/macro';
import { Link, useLocation, matchPath, withRouter } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

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
        <Item className="menuItem" key="1">
          <Link to="">WhiteList</Link>
        </Item>
        <Item className="menuItem" key="1">
          <Link to="">Users</Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(AppSider);
