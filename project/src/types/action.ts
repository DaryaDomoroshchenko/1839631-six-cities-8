import { AuthStatus, CityName } from '../const';
import Review from './review';
import { RoomOffer } from './room-offer';

export enum ActionType {
  SetAuthStatus = 'setAuthStatus',
  SetActiveCity = 'setActiveCity',
  SetOffers = 'setOffers',
  SetReviews = 'setReviews',
}

export type SetAuthStatusAction = {
  type: ActionType.SetAuthStatus;
  payload: AuthStatus;
};

export type SetActiveCityAction = {
  type: ActionType.SetActiveCity;
  payload: CityName;
};

export type SetOffersAction = {
  type: ActionType.SetOffers;
  payload: RoomOffer[];
};

export type SetReviewsAction = {
  type: ActionType.SetReviews;
  payload: Review[];
};

export type Actions =
  SetAuthStatusAction |
  SetActiveCityAction |
  SetOffersAction |
  SetReviewsAction;
