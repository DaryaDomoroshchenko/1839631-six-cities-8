import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { CityName, SortingType } from '../../const';
import { setActiveCity } from '../../store/actions/app-actions';
import { setSortingType } from '../../store/actions/data-actions';
import { makeMockRootState } from '../../utils/mocks';
import CityTabs from './city-tabs';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
const history = createMemoryHistory();

describe('Component: CityTabs', () => {
  it('should render correctly', () => {
    const store = mockStore(mockState);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <CityTabs/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.tabs')).not.toBeNull();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(container.querySelector('.tabs__item.tabs__item--active')).not.toBeNull();
  });

  it('should set active city when user click on city link', () => {
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <CityTabs/>
        </BrowserRouter>
      </Provider>,
    );

    const cityLink = screen.getByText(/Hamburg/i);
    const cityName = cityLink.textContent as CityName;
    userEvent.click(cityLink);

    expect(store.getActions())
      .toEqual([
        setActiveCity(cityName),
        setSortingType(SortingType.Popular),
      ]);
  });
});
