import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { makeMockRootState } from '../../utils/mocks';
import Main from '../main/main';
import UserBlockAuthorized from './user-block-authorized';

const mockStore = configureMockStore();
const mockStateWithAuth = makeMockRootState();
mockStateWithAuth.USER.authStatus = AuthStatus.auth;
mockStateWithAuth.USER.userEmail = 'oliver@mail.ru';

const history = createMemoryHistory();

describe('Component: UserBlockAuthorized', () => {
  it('should render correctly when user is authorized', () => {
    const store = mockStore(mockStateWithAuth);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <UserBlockAuthorized/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.header__nav')).not.toBeNull();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should redirect from "Main" to "Favorites" screen when user click to email', () => {
    history.push(AppRoute.Main);
    const store = mockStore(mockStateWithAuth);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path={AppRoute.Favorites}/>
            <Route exact path={AppRoute.Main}>
              <Main/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>,
    );

    userEvent.click(screen.getByTestId(/favorites-link/i));
    expect(history.location.pathname).toEqual(AppRoute.Favorites);
  });
});
