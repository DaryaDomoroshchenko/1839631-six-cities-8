import { AuthStatus, CityName, SortingTypes } from '../../const';
import { ActionType } from '../../types/action';
import Cities from '../../types/cities';
import { Review } from '../../types/review';
import { RoomOffer } from '../../types/room-offer';

export const setAuthStatus = (authStatus: AuthStatus) => ({
  type: ActionType.SetAuthStatus,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const setUserEmail = (userEmail: string) => ({
  type: ActionType.SetUserEmail,
  payload: userEmail,
} as const);

export const setActiveCity = (activeCity: CityName) => ({
  type: ActionType.SetActiveCity,
  payload: activeCity,
} as const);

export const setOffers = (offers: RoomOffer[]) => ({
  type: ActionType.SetOffers,
  payload: offers,
} as const);

export const setSuggestedOffers = (suggestedOffers: RoomOffer[]) => ({
  type: ActionType.SetSuggestedOffers,
  payload: suggestedOffers,
} as const);

export const setCities = (cities: Cities) => ({
  type: ActionType.SetCities,
  payload: cities,
} as const);

export const setSortingType = (sortingType: SortingTypes) => ({
  type: ActionType.SetSortingType,
  payload: sortingType,
} as const);

export const setReviews = (reviews: Review[]) => ({
  type: ActionType.SetReviews,
  payload: reviews,
} as const);
