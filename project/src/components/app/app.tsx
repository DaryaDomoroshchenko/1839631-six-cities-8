import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthStatus } from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import FavoritesPage from '../favorites-page/favorites-page';
import RoomPage from '../room-page/room-page';
import PrivateRoute from '../private-route/private-route';
import Error404 from '../error-404/error-404';
import { State } from '../../types/state';
import Spinner from '../spinner/spinner';
import { getAuthStatus } from '../../store/reducers/user-reducer/selectors';
import { getOffersLoadedStatus } from '../../store/reducers/data-reducer/selectors';

const mapStateToProps = (state: State) => ({
  authStatus: getAuthStatus(state),
  isOffersLoaded: getOffersLoadedStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({ authStatus, isOffersLoaded }: PropsFromRedux): JSX.Element {
  const isAuthStatusChecking = authStatus === AuthStatus.unknown;

  if (isAuthStatusChecking || !isOffersLoaded) {
    return <Spinner/>;
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
