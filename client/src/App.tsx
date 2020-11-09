import React, { useEffect } from 'react';
import { getAccessToken, setAccessToken } from './accessToken';
import { Routes } from './Routes';
import 'antd/dist/antd.css';

interface Props {}

export const App: React.FC<Props> = () => {
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
    });
  }, []);

  return <Routes />;
};
