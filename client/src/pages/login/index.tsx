import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Form, Input, Button, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { setAccessToken } from '../../accessToken';
import { LOGIN_MUTATION, ME_QUERY } from '../../graphql';
import BackgroundImage from '../../images/landing-page.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken, setUser } from 'components/auth-slice';

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
  min-width: 25%;
  height: auto;
  padding: 40px 25px;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;

  h2 {
    margin-bottom: 24px;
  }

  .ant-input {
    box-shadow: 0 0 0px 1000px #fff inset;
  }

  .submit-btn {
    width: 100%;

    span {
      margin: auto;
    }
  }
`;

interface formValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      console.log(token);
      notification['info']({
        message: 'You are already logged in!',
      });
      history.push('/home');
    }
  }, []);

  const onFinish = (values: formValues) => {
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
    })
      .then((response) => {
        const {
          data: {
            login: { message, status, redirectionURL, accessToken, user },
          },
        } = response;

        if (status) {
          notification['success']({
            message: message,
          });
          setAccessToken(accessToken);
          dispatch(setToken(accessToken));
          dispatch(setUser(user));
          history.push(redirectionURL);
        } else {
          notification['error']({
            message: message,
          });
        }
      })
      .catch((err) => {
        notification['error']({
          message: err.message,
        });
      });
  };

  return (
    <Background>
      <FormContainer>
        <h2>Welcome back!</h2>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email Address" size="large" />
          </Item>

          <Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Item>

          <Button
            className="submit-btn"
            loading={loading}
            type="primary"
            htmlType="submit"
            size="large"
          >
            LOG IN
          </Button>
        </Form>
      </FormContainer>
    </Background>
  );
};

export default Login;
