import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Login from './login';
import { makeMockRootState } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to "login" url', () => {
    const store = mockStore(makeMockRootState());
    history.push('/login');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login/>
        </Router>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText('Email'), 'email@mail.ru');
    userEvent.type(screen.getByPlaceholderText('Password'), '1234qwery');

    expect(screen.getByDisplayValue(/email@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234qwery/i)).toBeInTheDocument();
  });
});
