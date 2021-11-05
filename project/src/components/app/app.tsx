import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import RoomPage from '../room-page/room-page';
import PrivateRoute from '../private-route/private-route';
import Error404 from '../error-404/error-404';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main/>
        </Route>

        <Route path={`${AppRoute.RoomPage}/:id`} exact>
          <RoomPage/>
        </Route>

        <PrivateRoute
          path={AppRoute.Favorites}
          exact
          render={() =>
            <Favorites/>}
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
