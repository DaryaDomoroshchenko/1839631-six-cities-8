import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom';
import { makeMockRootState, makeOfferMock } from '../../utils/mocks';
import createAPI from '../../services/api';
import { State } from '../../types/state';
import { AppRoute, AuthStatus, CityName } from '../../const';
import FavoritesList from './favorites-list';
import Main from '../main/main';
import userEvent from '@testing-library/user-event';
import { setActiveCity } from '../../store/actions/app-actions';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const mockStateWithAuth = makeMockRootState();
mockStateWithAuth.USER.authStatus = AuthStatus.auth;
mockStateWithAuth.DATA.isFavoritesLoaded = true;
mockStateWithAuth.DATA.isOffersLoaded = true;

const mockOffers = [makeOfferMock()];
mockStateWithAuth.DATA.favoriteOffers = mockOffers;

const history = createMemoryHistory();

describe('Component: FavoritesList', () => {
  it('should render correctly when user is authorized', () => {
    const store = mockStore(mockStateWithAuth);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <FavoritesList favoriteOffers={mockOffers}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(container.querySelectorAll('.place-card').length).toEqual(3);
  });

  it('should redirect to "Main" screen and set active city when user click on city button', () => {
    history.push(AppRoute.Favorites);
    const store = mockStore(mockStateWithAuth);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path={AppRoute.Main}>
              <Main/>
            </Route>
            <Route exact path={AppRoute.Favorites}>
              <FavoritesList favoriteOffers={mockOffers}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>,
    );

    const cityButton = screen.getByTestId('city-btn');
    const cityName = cityButton.textContent as CityName;
    userEvent.click(cityButton);

    expect(history.location.pathname).toEqual(AppRoute.Main);
    expect(store.getActions())
      .toEqual([
        setActiveCity(cityName),
      ]);
  });
});
