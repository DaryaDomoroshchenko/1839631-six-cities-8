import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { AuthStatus } from '../../const';
import { makeMockRootState } from '../../utils/mocks';
import UserBlockNotAuthorized from './user-block-not-authorized';

const mockStore = configureMockStore();
const mockStateWithoutAuth = makeMockRootState();
mockStateWithoutAuth.USER.authStatus = AuthStatus.noAuth;

const history = createMemoryHistory();

describe('Component: UserBlockNotAuthorized', () => {
  it('should render correctly when user is not authorized', () => {
    const store = mockStore(mockStateWithoutAuth);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <UserBlockNotAuthorized/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.header__nav')).not.toBeNull();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
