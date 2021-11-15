import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AuthStatus, CityName, SortingTypes } from '../const';
import Review from './review';
import { RoomOffer } from './room-offer';
import State from './state';

export enum ActionType {
  SetAuthStatus = 'setAuthStatus',
  SetActiveCity = 'setActiveCity',
  SetOffers = 'setOffers',
  SetSortingType = 'setSortingType',
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

export type SetSortingTypeAction = {
  type: ActionType.SetSortingType;
  payload: SortingTypes;
};

export type SetReviewsAction = {
  type: ActionType.SetReviews;
  payload: Review[];
};

export type Actions =
  SetAuthStatusAction |
  SetActiveCityAction |
  SetOffersAction |
  SetSortingTypeAction |
  SetReviewsAction;

export type ThunkActionResult<P = Promise<void>> = ThunkAction<P, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
