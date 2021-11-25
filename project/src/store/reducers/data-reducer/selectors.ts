import { State } from '../../../types/state';
import { Review } from '../../../types/review';
import { RoomOffer } from '../../../types/room-offer';
import { createSelector } from 'reselect';
import { getActiveCity } from '../app-reducer/selectors';
import { sortOffers } from '../../../utils/common';
import { SortingType } from '../../../const';

// offers
export const getSortingType = (state: State): SortingType =>
  state.DATA.sortingType;

export const getOffers = (state: State): RoomOffer[] =>
  state.DATA.offers;

export const getOffersByCity = createSelector(
  [getOffers, getActiveCity, getSortingType],
  (offers, activeCity, sortingType) =>
    sortOffers(
      sortingType,
      offers.filter((offer) => offer.city.name === activeCity),
    ),
);

export const getOffersLoadedStatus = (state: State): boolean =>
  state.DATA.isOffersLoaded;

// suggested offers
export const getSuggestedOffers = (state: State): RoomOffer[] =>
  state.DATA.suggestedOffers;

// favorite offers
export const getFavoriteOffers = (state: State): RoomOffer[] =>
  state.DATA.favoriteOffers;

export const getFavoritesLoadedStatus = (state: State): boolean =>
  state.DATA.isFavoritesLoaded;

export const getFavoritesFilledStatus = (state: State): boolean =>
  !!state.DATA.favoriteOffers.length;

// reviews
export const getReviews = (state: State): Review[] =>
  state.DATA.reviews;
