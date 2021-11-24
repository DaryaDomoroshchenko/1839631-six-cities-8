import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter, Route } from 'react-router-dom';
import { AuthStatus } from '../../const';
import { makeMockRootState } from '../../utils/mocks';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route when user is unauthorized', () => {
    const mockStateWithoutAuth = makeMockRootState();
    mockStateWithoutAuth.USER.authStatus = AuthStatus.noAuth;
    const store = mockStore(mockStateWithoutAuth);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Route exact path="/login">
            <h1>Public Route</h1>
            <p>{mockStateWithoutAuth.USER.authStatus}</p>
          </Route>
          <PrivateRoute
            path="/private"
            exact
            render={() => (
              <h1>Private Route</h1>
            )}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route when user is authorized', () => {
    const mockStateWithAuth = makeMockRootState();
    mockStateWithAuth.USER.authStatus = AuthStatus.auth;
    const store = mockStore(mockStateWithAuth);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Route exact path="/login">
            <h1>Public Route</h1>
          </Route>
          <PrivateRoute
            path="/private"
            exact
            render={() => (
              <h1>Private Route</h1>
            )}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
