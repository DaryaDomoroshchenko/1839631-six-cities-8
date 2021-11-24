import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import createAPI from '../../services/api';
import { State } from '../../types/state';
import { APIRoute } from '../../const';
import { makeReviewServerMock } from '../../utils/mocks';
import { setReviews } from '../actions/data-actions';
import { adaptReviewsToClient } from '../../utils/common';
import { datatype, lorem } from 'faker';
import { fetchReviewsAction, sendCommentAction } from './api-actions-reviews';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

describe('Async reviews actions', () => {
  it('should dispatch reviews when GET/comments/hotelId', async () => {
    const store = mockStore();
    const offerId = datatype.number();
    const mockReviews = [makeReviewServerMock(), makeReviewServerMock(), makeReviewServerMock()];
    mockAPI
      .onGet(`${APIRoute.Reviews}/${offerId}`)
      .reply(200, mockReviews);

    await store.dispatch(fetchReviewsAction(offerId));
    const adaptedMockOReviews = adaptReviewsToClient(mockReviews);

    expect(store.getActions())
      .toEqual([
        setReviews(adaptedMockOReviews),
      ]);
  });
  it('should publish review when POST/comments/hotelId/offerId', async () => {
    const store = mockStore();
    const offerId = datatype.number();
    const comment = lorem.sentence();
    const rating = datatype.number(5);
    const mockReviews = [makeReviewServerMock(), makeReviewServerMock(), makeReviewServerMock()];
    mockAPI
      .onPost(`${APIRoute.Reviews}/${offerId}`, { comment, rating })
      .reply(200, mockReviews);

    await store.dispatch(sendCommentAction({ id: offerId, comment, rating }));
    const adaptedMockReviews = adaptReviewsToClient(mockReviews);

    expect(store.getActions())
      .toEqual([
        setReviews(adaptedMockReviews),
      ]);
  });
});
