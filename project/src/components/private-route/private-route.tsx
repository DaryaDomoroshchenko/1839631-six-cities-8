import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getIsLoggedInStatus } from '../../store/reducers/user-reducer/selectors';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

const mapStateToProps = (state: State) => ({
  isLoggedIn: getIsLoggedInStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPrivateRouteProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute({ exact, path, render, isLoggedIn }: ConnectedPrivateRouteProps): JSX.Element {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        isLoggedIn
          ? render()
          : <Redirect to={AppRoute.Login}/>
      )}
    />
  );
}

export { PrivateRoute };
export default connector (PrivateRoute);
