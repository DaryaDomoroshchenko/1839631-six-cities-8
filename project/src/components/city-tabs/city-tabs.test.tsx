import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
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
    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(container.querySelector('.tabs__item.tabs__item--active')).not.toBeNull();
  });
});
