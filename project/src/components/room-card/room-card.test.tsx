import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState, makeOfferMock } from '../../utils/mocks';
import RoomCard from './room-card';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
const history = createMemoryHistory();
const store = mockStore(mockState);
const mockOffer = makeOfferMock();

describe('Component: RoomCard', () => {
  it('should render card from Main page correctly', () => {
    const roomCardType = 'mainPage';

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <RoomCard roomCardType={roomCardType} offer={mockOffer}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.cities__place-card')).not.toBeNull();
  });

  it('should render favorites card correctly', () => {
    const roomCardType = 'favoritesPage';

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <RoomCard roomCardType={roomCardType} offer={mockOffer}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.favorites__card')).not.toBeNull();
  });

  it('should render suggested card correctly', () => {
    const roomCardType = 'roomPage';

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <RoomCard roomCardType={roomCardType} offer={mockOffer}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.near-places__card')).not.toBeNull();
  });
});
