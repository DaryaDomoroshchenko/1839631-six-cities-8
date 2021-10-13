import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

import Main from '../main/main';
import LogIn from '../login-in/login-in';
import Favorites from '../favorites/favorites';
import RoomOffer from '../room-offer/room-offer';
import PrivateRoute from '../private-route/private-route';
import Error404 from '../error-404/error-404';

type AppProps = {
  roomCount: number;
}

function App({roomCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main roomCount={roomCount}/>
        </Route>
        <Route exact path={AppRoute.LogIn}>
          <LogIn/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route exact path={AppRoute.RoomOffer}>
          <RoomOffer/>
        </Route>
        <Route
          render={() => <Error404/>}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
