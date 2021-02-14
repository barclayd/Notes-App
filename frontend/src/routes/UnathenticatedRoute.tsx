import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import { FC } from 'react';

export const UnauthenticatedRoute: FC<RouteProps> = (
  { children },
  ...props
) => {
  const { isAuthenticated } = useAppContext();

  return (
    <Route {...props}>
      {isAuthenticated ? <Redirect to={'/'} /> : children}
    </Route>
  );
};
