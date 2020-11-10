import { AppLayout } from 'components';
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login, WhiteList, Home, CreateForm, EditForm } from './pages';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />

        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route exact path="/whitelist" component={WhiteList} />
          <Route exact path="/new-item" component={CreateForm} />
          <Route exact path="/edit-item/:id" component={EditForm} />
        </AppLayout>
      </Switch>
    </BrowserRouter>
  );
};
