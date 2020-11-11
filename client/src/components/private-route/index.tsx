import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from 'components/auth-slice';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const token = useSelector(selectToken);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
