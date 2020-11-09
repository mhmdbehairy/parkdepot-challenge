import React from 'react';
import styled from '@emotion/styled';
import { Layout, Button, notification } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { useMutation, useQuery } from '@apollo/client';
import { LOGOUT_MUTATION, ME_QUERY } from '../../graphql';

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
  const history = useHistory();

  const { data, called } = useQuery(ME_QUERY);
  const [logout] = useMutation(LOGOUT_MUTATION);

  const handleLogout = () => {
    logout()
      .then((response) => {
        if (response?.data?.logout) {
          notification['success']({
            message: 'Successfully logged out!',
          });
          history.push('/login');
        }
      })
      .catch((err) => {
        notification['error']({
          message: err.message,
        });
      });
  };

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

        {/*  {data?.user?.email && (
          <Badge
            status="success"
            text={data?.user?.email}
            style={{
              height: '50%',
              marginRight: 10,
              transform: 'translateY(20%)',
            }}
          />
        )} */}

        <Button
          type="link"
          onClick={handleLogout}
          style={{ height: '50%', padding: 0, transform: 'translateY(50%)' }}
        >
          Logout
        </Button>
      </Header>
    </HeaderContainer>
  );
};

export default AppHeader;
