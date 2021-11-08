import { AuthStatus, CityName } from '../const';
import {
  ActionType,
  SetActiveCityAction,
  SetAuthStatusAction,
  SetOffersAction,
  SetReviewsAction
} from '../types/action';
import Review from '../types/review';
import { RoomOffer } from '../types/room-offer';

export const setAuthStatus = (authStatus: AuthStatus): SetAuthStatusAction => ({
  type: ActionType.SetAuthStatus,
  payload: authStatus,
});

export const setActiveCity = (activeCity: CityName): SetActiveCityAction => ({
  type: ActionType.SetActiveCity,
  payload: activeCity,
});

export const setOffers = (offers: RoomOffer[]): SetOffersAction => ({
  type: ActionType.SetOffers,
  payload: offers,
});

export const setReviews = (reviews: Review[]): SetReviewsAction => ({
  type: ActionType.SetReviews,
  payload: reviews,
});
