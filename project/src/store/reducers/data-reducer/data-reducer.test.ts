import { SortingTypes } from '../../../const';
import { dataState } from '../../../types/state';
import dataReducer from './data-reducer';
import { makeOfferMock, makeReviewMock } from '../../../utils/mocks';
import {
  setFavoriteOffers,
  setOffers,
  setReviews,
  setSortingType,
  setSuggestedOffers,
  updateOfferFavStatus
} from '../../actions/data-actions';

const initialState: dataState = {
  offers: [],
  suggestedOffers: [],
  favoriteOffers: [],
  isOffersLoaded: false,
  isFavoritesLoaded: false,
  reviews: [],
  sortingType: SortingTypes.popular,
};

describe('Reducer: dataReducer', () => {
  it('should set offers', () => {
    const offers = [makeOfferMock(), makeOfferMock(), makeOfferMock()];
    expect(dataReducer(initialState, setOffers(offers)))
      .toEqual({
        ...initialState,
        offers,
        isOffersLoaded: true,
      });
  });
  it('should set suggestedOffers', () => {
    const suggestedOffers = [makeOfferMock(), makeOfferMock(), makeOfferMock()];
    expect(dataReducer(initialState, setSuggestedOffers(suggestedOffers)))
      .toEqual({
        ...initialState,
        suggestedOffers,
      });
  });
  it('should set favoriteOffers', () => {
    const favoriteOffers = [makeOfferMock(), makeOfferMock(), makeOfferMock()];
    expect(dataReducer(initialState, setFavoriteOffers(favoriteOffers)))
      .toEqual({
        ...initialState,
        favoriteOffers,
        isFavoritesLoaded: true,
      });
  });
  it('should update offer`s favorite status', () => {
    const targetFavOffer = makeOfferMock();
    targetFavOffer.isFavorite = true;
    const anotherOffer = makeOfferMock();

    const offerId = targetFavOffer.id;

    const state = {
      ...initialState,
      offers: [targetFavOffer, anotherOffer],
      suggestedOffers: [targetFavOffer, anotherOffer],
      favoriteOffers: [targetFavOffer, anotherOffer],
    };

    const targetUnFavOffer = targetFavOffer;
    targetUnFavOffer.isFavorite = false;

    expect(dataReducer(state, updateOfferFavStatus(offerId)))
      .toEqual({
        ...initialState,
        offers: [targetUnFavOffer, anotherOffer],
        suggestedOffers: [targetUnFavOffer, anotherOffer],
        favoriteOffers: [anotherOffer],
      });
  });
  it('should set reviews', () => {
    const reviews = [makeReviewMock(), makeReviewMock(), makeReviewMock()];
    expect(dataReducer(initialState, setReviews(reviews)))
      .toEqual({
        ...initialState,
        reviews,
      });
  });
  it('should set sortingType', () => {
    const sortingType = SortingTypes.expensiveFirst;
    expect(dataReducer(initialState, setSortingType(sortingType)))
      .toEqual({
        ...initialState,
        sortingType,
      });
  });
});
