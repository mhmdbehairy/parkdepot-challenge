import { AppLayout, PrivateRoute } from 'components';
import React from 'react';

import { Route, Switch } from 'react-router-dom';

import {
  Login,
  WhiteList,
  Home,
  CreateForm,
  EditForm,
  Unauthorized,
  NotFound,
} from './pages';

export const Routes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />

        <AppLayout>
          <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute
              exact
              path="/whitelist"
              permission="VIEW_ITEMS"
              component={WhiteList}
            />
            <PrivateRoute
              exact
              path="/new-item"
              permission="CREATE_ITEM"
              component={CreateForm}
            />
            <PrivateRoute
              path="/edit-item/:id"
              permission="UPDATE_ITEM"
              component={EditForm}
            />

            <Route path="/401" component={Unauthorized} />
            <Route component={NotFound} />
          </Switch>
        </AppLayout>
      </Switch>
    </>
  );
};
