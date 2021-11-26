import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { makeMockRootState } from '../../utils/mocks';
import { AppRoute } from '../../const';
import LoginForm from './login-form';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
const history = createMemoryHistory();

describe('Component: LoginForm', () => {
  it('should render "LoginForm" when user navigate to "/login"', () => {
    const store = mockStore(mockState);
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <LoginForm/>
        </BrowserRouter>
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
