import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import RoomPage from '../room-page/room-page';
import PrivateRoute from '../private-route/private-route';
import Error404 from '../error-404/error-404';
import Review from '../../types/review';

type AppProps = {
  reviews: Review[];
}

function App({ reviews }: AppProps): JSX.Element {
  const currAuthStatus = AuthorizationStatus.Auth;

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main
            authorizationStatus={currAuthStatus}
          />
        </Route>

        <Route path={`${AppRoute.RoomPage}/:id`} exact>
          <RoomPage
            authorizationStatus={currAuthStatus}
            reviews={reviews}
          />
        </Route>

        <PrivateRoute
          path={AppRoute.Favorites}
          exact
          authorizationStatus={currAuthStatus}
          render={() =>
            <Favorites authorizationStatus={currAuthStatus}/>}
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

export default App;
