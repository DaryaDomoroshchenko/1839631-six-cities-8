import { NameSpace } from '../../root-reducer';
import { State } from '../../../types/state';
import { Review } from '../../../types/review';
import { RoomOffer } from '../../../types/room-offer';

export const getOffers = (state: State): RoomOffer[] =>
  state[NameSpace.data].offers;

export const getSuggestedOffers = (state: State): RoomOffer[] =>
  state[NameSpace.data].suggestedOffers;

export const getFavoriteOffers = (state: State): RoomOffer[] =>
  state[NameSpace.data].favoriteOffers;

export const getOffersLoadedStatus = (state: State): boolean =>
  state[NameSpace.data].isOffersLoaded;

export const getFavoritesLoadedStatus = (state: State): boolean =>
  state[NameSpace.data].isFavoritesLoaded;

export const getReviews = (state: State): Review[] =>
  state[NameSpace.data].reviews;
