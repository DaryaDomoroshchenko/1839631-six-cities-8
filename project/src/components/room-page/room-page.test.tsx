import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router as BrowserRouter } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import createAPI from '../../services/api';
import { State } from '../../types/state';
import { makeMockRootState, makeOfferMock } from '../../utils/mocks';
import RoomPage from './room-page';
import { AppRoute } from '../../const';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const mockState = makeMockRootState();
const history = createMemoryHistory();

const mockOffer = makeOfferMock();
mockOffer.id = 4;
const mockOffers = [mockOffer];
mockState.DATA.offers = mockOffers;

describe('Component: RoomPage', () => {
  it('should render correctly', () => {
    const store = mockStore(mockState);
    history.push(`${AppRoute.RoomPage}/4`);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Route exact path={`${AppRoute.RoomPage}/:offerId`}>
            <RoomPage/>
          </Route>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.page__main--property')).not.toBeNull();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});

