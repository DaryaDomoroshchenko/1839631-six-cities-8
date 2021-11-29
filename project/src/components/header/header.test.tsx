import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { AuthStatus } from '../../const';
import { makeMockRootState } from '../../utils/mocks';
import Header from './header';

const mockStore = configureMockStore();
const mockStateWithoutAuth = makeMockRootState();
mockStateWithoutAuth.USER.authStatus = AuthStatus.NoAuth;

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly with "showNav" prop', () => {
    const store = mockStore(mockStateWithoutAuth);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Header showNav/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.header')).not.toBeNull();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly without "showNav" prop', () => {
    const store = mockStore(mockStateWithoutAuth);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Header/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.header__nav')).toBeNull();
  });
});
