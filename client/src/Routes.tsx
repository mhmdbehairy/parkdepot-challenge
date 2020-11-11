import { AppLayout, PrivateRoute } from 'components';
import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { Login, WhiteList, Home, CreateForm, EditForm } from './pages';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <AppLayout>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/whitelist" component={WhiteList} />
        <PrivateRoute exact path="/new-item" component={CreateForm} />
        <PrivateRoute exact path="/edit-item/:id" component={EditForm} />
      </AppLayout>
    </Switch>
  );
};
