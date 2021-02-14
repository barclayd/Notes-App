import { useLocation, Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import { FC } from 'react';

export const AuthenticatedRoute: FC<RouteProps> = ({ children }, ...props) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  return (
    <Route {...props}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
};
