import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import State from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

const mapStateToProps = ({ authStatus }: State) => ({
  authStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPrivateRouteProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedPrivateRouteProps): JSX.Element {
  const { exact, path, render, authStatus } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authStatus === AuthStatus.auth
          ? render()
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export { PrivateRoute };
export default connector (PrivateRoute);
