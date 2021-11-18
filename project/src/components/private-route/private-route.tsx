import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import State from '../../types/state';

type PrivateRouteProps = RouteProps & {
  page: string;
  render: () => JSX.Element;
}

const mapStateToProps = ({ authStatus }: State) => ({
  isLoggedIn: authStatus === AuthStatus.auth,
  isNotLoggedIn: authStatus !== AuthStatus.auth,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPrivateRouteProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute({ page, exact, path, render, isLoggedIn, isNotLoggedIn }: ConnectedPrivateRouteProps): JSX.Element {
  const loginRoute = () => (
    isNotLoggedIn
      ? render()
      : <Redirect to={AppRoute.Main}/>
  );

  const favoritesRoute = () => (
    isLoggedIn
      ? render()
      : <Redirect to={AppRoute.Login}/>
  );

  return (
    <Route
      exact={exact}
      path={path}
      render={page === 'favorites' ? favoritesRoute : loginRoute}
    />
  );
}

export { PrivateRoute };
export default connector (PrivateRoute);
