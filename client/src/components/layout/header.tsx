import React from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { Layout, Button, Badge } from 'antd';
import { ME_QUERY } from '../../graphql';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';

const { Header } = Layout;

const HeaderContainer = styled.header`
  .app-header {
    height: 80px;
    width: 95%;
    margin: auto;
    display: flex;
    background: #f2f2f2;
  }
`;

const AppHeader: React.FC = () => {
  const { data } = useQuery(ME_QUERY);

  return (
    <HeaderContainer>
      <Header className="app-header">
        <div
          style={{
            flex: '1 1 0',
          }}
        >
          <Link to="/">
            <img
              src={Logo}
              alt="The park-depot logo"
              style={{ height: '60px', width: '260px ', marginTop: 5 }}
            />
          </Link>
        </div>

        {data?.user?.email && (
          <Badge
            status="success"
            text={data?.user?.email}
            style={{
              height: '50%',
              marginRight: 10,
              transform: 'translateY(20%)',
            }}
          />
        )}

        <Button
          type="link"
          //onClick={() => handleLogout()}
          style={{ height: '50%', padding: 0, transform: 'translateY(50%)' }}
        >
          Logout
        </Button>
      </Header>
    </HeaderContainer>
  );
};

export default AppHeader;
