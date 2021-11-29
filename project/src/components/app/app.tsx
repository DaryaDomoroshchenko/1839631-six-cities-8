import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute, AuthStatus } from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import FavoritesPage from '../favorites-page/favorites-page';
import RoomPage from '../room-page/room-page';
import PrivateRoute from '../private-route/private-route';
import Error404 from '../error-404/error-404';
import Spinner from '../spinner/spinner';
import { getAuthStatus } from '../../store/reducers/user-reducer/selectors';
import { getOffersLoadedStatus } from '../../store/reducers/data-reducer/selectors';

function App(): JSX.Element {
  const authStatus = useSelector(getAuthStatus);
  const isOffersLoaded = useSelector(getOffersLoadedStatus);

  const isAuthStatusChecking = authStatus === AuthStatus.Unknown;

  if (isAuthStatusChecking || !isOffersLoaded) {
    return <Spinner/>;
  }

  return (
    <Switch>
      <Route path={AppRoute.Main} exact>
        <Main/>
      </Route>

      <Route path={`${AppRoute.RoomPage}/:offerId`} exact>
        <RoomPage/>
      </Route>

      <PrivateRoute
        path={AppRoute.Favorites}
        exact
        render={() =>
          <FavoritesPage/>}
      />

      <Route path={AppRoute.Login} exact>
        <Login/>
      </Route>

      <Route
        render={() => <Error404/>}
      />
    </Switch>
  );
}

export default App;
