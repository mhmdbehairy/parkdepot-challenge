import React from 'react';
import styled from '@emotion/styled';
import { Layout, Button, notification, Badge } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../../graphql';

const { Header } = Layout;

const HeaderContainer = styled.header`
  .app-header {
    height: 80px;
    width: 95%;
    margin: auto;
    display: flex;
    background: #f2f2f2;
  }

  .logout-link,
  .user-email {
    height: 50%;
  }

  .user-email {
    margin-right: 35px;
    transform: translateY(25%);
  }

  .logout-link {
    padding: 0;
    transform: translateY(50%);
  }

  img {
    height: 60px;
    width: 260px;
    margin-top: 5px;
  }
`;

interface HeaderProps {
  user: { email: string; id: string };
}

const AppHeader: React.FC<HeaderProps> = ({ user }) => {
  const history = useHistory();

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
            <img src={Logo} alt="The park-depot logo" />
          </Link>
        </div>

        <Badge className="user-email" status="success" text={user?.email} />

        <Button type="link" className="logout-link" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
    </HeaderContainer>
  );
};

export default AppHeader;
