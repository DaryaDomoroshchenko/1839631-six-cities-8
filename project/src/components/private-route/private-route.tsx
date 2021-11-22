import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getIsLoggedInStatus } from '../../store/reducers/user-reducer/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute({ exact, path, render }: PrivateRouteProps): JSX.Element {
  const isLoggedIn = useSelector(getIsLoggedInStatus);

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

export default PrivateRoute;
