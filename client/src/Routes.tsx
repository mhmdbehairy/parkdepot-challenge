import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './pages';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
