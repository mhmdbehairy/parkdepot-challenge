import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from 'components/auth-slice';
import { Can } from 'components';

const PrivateRoute = ({ component: Component, permission, ...rest }: any) => {
  const token = useSelector(selectToken);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          permission ? (
            <Can
              perform={permission}
              yes={<Component {...props} />}
              no={() => <Redirect to="/401" />}
            />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
