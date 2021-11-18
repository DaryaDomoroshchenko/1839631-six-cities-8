import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, AuthStatus } from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import FavoritesPage from '../favorites-page/favorites-page';
import RoomPage from '../room-page/room-page';
import PrivateRoute from '../private-route/private-route';
import Error404 from '../error-404/error-404';
import State from '../../types/state';
import Spinner from '../spinner/spinner';

const mapStateToProps = ({ authStatus, isOffersLoaded }: State) => ({
  authStatus, isOffersLoaded,
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
          page={'favorites'}
          path={AppRoute.Favorites}
          exact
          render={() =>
            <FavoritesPage/>}
        />

        <PrivateRoute
          page={'login'}
          path={AppRoute.Login}
          exact
          render={() =>
            <Login/>}
        />

        <Route
          render={() => <Error404/>}
        />
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
