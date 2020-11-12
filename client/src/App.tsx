import React, { useEffect, useState } from 'react';
import { setAccessToken } from './accessToken';
import { Routes } from './Routes';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { ME_QUERY } from './graphql';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from './components/auth-slice';

interface Props {}

export const App: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [getUser] = useLazyQuery(ME_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (res) => {
      dispatch(setUser(res.me));
      setLoading(false);
    },
  });

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API}:4000/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      dispatch(setToken(accessToken));
      getUser();
    });
  }, [getUser]);

  if (loading) {
    console.log('hi');
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Spin style={{ margin: 'auto' }} />
      </div>
    );
  }

  return <Routes />;
};
