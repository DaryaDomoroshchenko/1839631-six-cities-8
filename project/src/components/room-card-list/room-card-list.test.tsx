import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState, makeOfferMock } from '../../utils/mocks';
import RoomCardList from './room-card-list';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
const history = createMemoryHistory();
const store = mockStore(mockState);
const mockOffers = [makeOfferMock(), makeOfferMock(), makeOfferMock()];

describe('Component: RoomCardList', () => {
  it('should render correctly on Main page', () => {
    const roomCardType = 'mainPage';

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <RoomCardList roomCardType={roomCardType} offers={mockOffers}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.cities__places-list')).toBeInTheDocument();
    expect(container.querySelector('.cities__place-card')).toBeInTheDocument();
  });

  it('should render correctly on Favorites page', () => {
    const roomCardType = 'favoritesPage';

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <RoomCardList roomCardType={roomCardType} offers={mockOffers}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.places__list')).toBeInTheDocument();
    expect(container.querySelector('.favorites__card')).toBeInTheDocument();
  });

  it('should render correctly on Room page', () => {
    const roomCardType = 'roomPage';

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <RoomCardList roomCardType={roomCardType} offers={mockOffers}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.near-places__list')).toBeInTheDocument();
    expect(container.querySelector('.near-places__card')).toBeInTheDocument();
  });
});
