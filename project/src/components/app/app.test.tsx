import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { makeMockRootState } from '../../utils/mocks';
import App from './app';

const mockStore = configureMockStore();
const mockStateWithoutAuth = makeMockRootState();
mockStateWithoutAuth.USER.authStatus = AuthStatus.noAuth;
mockStateWithoutAuth.DATA.isFavoritesLoaded = true;
mockStateWithoutAuth.DATA.isOffersLoaded = true;

const mockStateWithAuth = makeMockRootState();
mockStateWithAuth.USER.authStatus = AuthStatus.auth;
mockStateWithoutAuth.DATA.isFavoritesLoaded = true;
mockStateWithAuth.DATA.isOffersLoaded = true;

const storeWithoutAuth = mockStore(mockStateWithoutAuth);
const storeWithAuth = mockStore(mockStateWithAuth);

const history = createMemoryHistory();

const fakeAppWithAuth = (
  <Provider store={storeWithAuth}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
);

const fakeAppWithoutAuth = (
  <Provider store={storeWithoutAuth}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
);

describe('App routing', () => {
  it('should render Main screen when user goes to "/"', () => {
    render(fakeAppWithAuth);
    history.push(AppRoute.Main);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "Login" screen when user navigate to "/login"', () => {
    render(fakeAppWithoutAuth);
    history.push(AppRoute.Login);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when unauthorized user navigate to "/favorites"', () => {
    render(fakeAppWithoutAuth);
    history.push(AppRoute.Favorites);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to "/404"', () => {
    history.push('/non-existent-route');
    render(fakeAppWithAuth);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to main page/i)).toBeInTheDocument();
  });
});
