import { AppLayout } from 'components';
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login, WhiteList, Home } from './pages';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />

        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route exact path="/whitelist" component={WhiteList} />
        </AppLayout>
      </Switch>
    </BrowserRouter>
  );
};
