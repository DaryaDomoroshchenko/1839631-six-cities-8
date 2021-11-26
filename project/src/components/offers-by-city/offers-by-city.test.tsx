import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState, makeOfferMock } from '../../utils/mocks';
import OffersByCity from './offers-by-city';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
mockState.DATA.isOffersLoaded = true;

const mockOffers = [makeOfferMock()];
mockState.DATA.favoriteOffers = mockOffers;

const history = createMemoryHistory();

describe('Component: OffersByCity', () => {
  it('should render correctly when offers are loaded', () => {
    const store = mockStore(mockState);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <OffersByCity offersByCity={mockOffers}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(container.querySelector('.places__list')).toBeInTheDocument();
  });
});
