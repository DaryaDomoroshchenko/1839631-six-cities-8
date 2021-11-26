import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState, makeOfferMock } from '../../utils/mocks';
import FavoritesPage from './favorites-page';
import createAPI from '../../services/api';
import { State } from '../../types/state';
import { AuthStatus } from '../../const';

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
const mockOffers = [makeOfferMock(), makeOfferMock(), makeOfferMock()];
mockStateWithAuth.DATA.favoriteOffers = mockOffers;

const history = createMemoryHistory();

describe('Component: FavoritesPage', () => {
  it('should render correctly when user is authorized', () => {
    const store = mockStore(mockStateWithAuth);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <FavoritesPage/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
