import React from 'react';
import styled from '@emotion/styled';
import { Form, Input, Button, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../../accessToken';
import { LOGIN_MUTATION, ME_QUERY } from '../../graphql';
import BackgroundImage from '../../images/landing-page.jpg';

const { Item } = Form;

const Background = styled.section`
  height: 100vh;
  display: flex;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

const FormContainer = styled.div`
  margin: auto;
  width: 25%;
  height: 300px;
  padding: 40px 25px;
  background-color: #fff;
`;

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useMutation(LOGIN_MUTATION);

  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;

    login({
      variables: {
        email,
        password,
      },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        store.writeQuery({
          query: ME_QUERY,
          data: { me: data.login.user },
        });
      },
    }).then((response) => {
      if (response?.data) {
        notification['success']({
          message: 'Successfully logged in!',
        });
        setAccessToken(response.data.login.accessToken);
        history.push('/');
      } else {
        notification['error']({
          message: 'Failed to login, try again!',
        });
      }
    });
  };

  return (
    <Background>
      <FormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" size="large" />
          </Item>

          <Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Item>

          <Button type="primary" htmlType="submit" size="large">
            Login
          </Button>
        </Form>
      </FormContainer>
    </Background>
  );
};

export default Login;
