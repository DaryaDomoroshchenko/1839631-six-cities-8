import { NameSpace } from '../../root-reducer';
import { State } from '../../../types/state';
import { Review } from '../../../types/review';
import { RoomOffer } from '../../../types/room-offer';

// offers
export const getOffers = (state: State): RoomOffer[] =>
  state[NameSpace.data].offers;

export const getOffersLoadedStatus = (state: State): boolean =>
  state[NameSpace.data].isOffersLoaded;

// suggested offers
export const getSuggestedOffers = (state: State): RoomOffer[] =>
  state[NameSpace.data].suggestedOffers;

// favorite offers
export const getFavoriteOffers = (state: State): RoomOffer[] =>
  state[NameSpace.data].favoriteOffers;

export const getFavoritesLoadedStatus = (state: State): boolean =>
  state[NameSpace.data].isFavoritesLoaded;

export const getFavoritesFilledStatus = (state: State): boolean =>
  !!state[NameSpace.data].favoriteOffers.length;

// reviews
export const getReviews = (state: State): Review[] =>
  state[NameSpace.data].reviews;
