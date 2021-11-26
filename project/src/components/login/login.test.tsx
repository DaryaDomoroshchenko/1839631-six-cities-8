import { render, screen } from '@testing-library/react';
import { Router as BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import Login from './login';
import { makeMockRootState } from '../../utils/mocks';
import { AppRoute, CityName } from '../../const';
import { setActiveCity } from '../../store/actions/app-actions';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
const history = createMemoryHistory();

describe('Component: LoginScreen', () => {
  it('should render "Login" screen when user navigate to "/login"', () => {
    const store = mockStore(mockState);
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Login/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/sign-in/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

  });

  it('should set active city when user click to city button', () => {
    const store = mockStore(mockState);
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Login/>
        </BrowserRouter>
      </Provider>,
    );

    const cityButton = screen.getByTestId('location-btn');
    const cityName = cityButton.textContent as CityName;
    userEvent.click(cityButton);

    expect(store.getActions())
      .toEqual([
        setActiveCity(cityName),
      ]);
  });
});
