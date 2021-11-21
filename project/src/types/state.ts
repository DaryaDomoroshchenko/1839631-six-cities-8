import { AuthStatus, CityName, SortingTypes } from '../const';
import { RootState } from '../store/root-reducer';
import Cities from './cities';
import { Review } from './review';
import { RoomOffer } from './room-offer';

export type userState = {
  authStatus: AuthStatus;
  userEmail: string;
}

export type dataState = {
  offers: RoomOffer[];
  suggestedOffers: RoomOffer[];
  favoriteOffers: RoomOffer[];
  isOffersLoaded: boolean;
  isFavoritesLoaded: boolean;
  reviews: Review[];
}

export type appState = {
  activeCity: CityName;
  cities: Cities;
  sortingType: SortingTypes;
}

export type State = RootState;
