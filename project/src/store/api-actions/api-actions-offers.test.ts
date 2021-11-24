import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import createAPI from '../../services/api';
import { State } from '../../types/state';
import { APIRoute } from '../../const';
import { makeOfferServerMock } from '../../utils/mocks';
import { changeFavoriteStatusAction, fetchFavoriteOffersAction, fetchOffersListAction, fetchSuggestedOffersAction } from './api-actions-offers';
import { setFavoriteOffers, setOffers, setSuggestedOffers, updateOfferFavStatus } from '../actions/data-actions';
import { setCities } from '../actions/app-actions';
import { adaptOffersToClient, getCities } from '../../utils/common';
import { datatype } from 'faker';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

describe('Async offers actions', () => {
  it('should dispatch offers when GET/hotels', async () => {
    const store = mockStore();
    const mockOffers = [makeOfferServerMock(), makeOfferServerMock(), makeOfferServerMock()];
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    await store.dispatch(fetchOffersListAction());
    const adaptedMockOffers = adaptOffersToClient(mockOffers);

    expect(store.getActions())
      .toEqual([
        setOffers(adaptedMockOffers),
        setCities(getCities(adaptedMockOffers)),
      ]);
  });
  it('should dispatch suggested offers when GET/hotels/hotelId', async () => {
    const store = mockStore();
    const offerId = datatype.number();
    const mockOffers = [makeOfferServerMock(), makeOfferServerMock(), makeOfferServerMock()];
    mockAPI
      .onGet(`${APIRoute.Offers}/${offerId}${APIRoute.SuggestedOffers}`)
      .reply(200, mockOffers);

    await store.dispatch(fetchSuggestedOffersAction(offerId));
    const adaptedMockOffers = adaptOffersToClient(mockOffers);

    expect(store.getActions())
      .toEqual([
        setSuggestedOffers(adaptedMockOffers),
      ]);
  });
  it('should dispatch favorite offers when GET/favorite', async () => {
    const store = mockStore();
    const mockOffers = [makeOfferServerMock(), makeOfferServerMock(), makeOfferServerMock()];
    mockAPI
      .onGet(APIRoute.FavoriteOffers)
      .reply(200, mockOffers);

    await store.dispatch(fetchFavoriteOffersAction());
    const adaptedMockOffers = adaptOffersToClient(mockOffers);

    expect(store.getActions())
      .toEqual([
        setFavoriteOffers(adaptedMockOffers),
      ]);
  });
  it('should change favorite status when POST/favorite/hotelId/status', async () => {
    const store = mockStore();
    const mockOffer = makeOfferServerMock();
    const offerId = mockOffer.id;
    const status = 0;
    mockAPI
      .onPost(`${APIRoute.FavoriteOffers}/${offerId}/${status}`)
      .reply(200, mockOffer);

    await store.dispatch(changeFavoriteStatusAction({offerId: mockOffer.id, status}));

    expect(store.getActions())
      .toEqual([
        updateOfferFavStatus(offerId),
      ]);
  });
});
