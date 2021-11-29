import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState } from '../../utils/mocks';
import createAPI from '../../services/api';
import { State } from '../../types/state';
import { AuthStatus } from '../../const';
import FavoritesEmpty from './favorites-empty';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const mockStateWithAuth = makeMockRootState();
mockStateWithAuth.USER.authStatus = AuthStatus.Auth;
mockStateWithAuth.DATA.isFavoritesLoaded = true;
mockStateWithAuth.DATA.isOffersLoaded = true;

const history = createMemoryHistory();

describe('Component: FavoritesEmpty', () => {
  it('should render correctly when favorites are empty', () => {
    const store = mockStore(mockStateWithAuth);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <FavoritesEmpty/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
