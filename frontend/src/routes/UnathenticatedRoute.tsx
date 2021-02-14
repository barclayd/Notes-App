import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import { FC } from 'react';
import { queryPath } from '../helpers/queryString';

export const UnauthenticatedRoute: FC<RouteProps> = (
  { children },
  ...props
) => {
  const { isAuthenticated } = useAppContext();
  const redirectRoute = queryPath('redirect') ?? '/';

  return (
    <Route {...props}>
      {isAuthenticated ? <Redirect to={redirectRoute} /> : children}
    </Route>
  );
};
