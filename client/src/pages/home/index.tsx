import { getAccessToken } from 'accessToken';
import React from 'react';

const Home: React.FC = () => {
  console.log(getAccessToken());
  return <h2>Home</h2>;
};

export default Home;
