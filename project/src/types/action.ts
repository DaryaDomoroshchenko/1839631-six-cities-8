import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import State from './state';

import {
  setAuthStatus,
  requireLogout,
  setUserEmail,
  setActiveCity,
  setOffers,
  setCities,
  setSortingType,
  setReviews
} from '../store/actions/action';

export enum ActionType {
  SetAuthStatus = 'user/setAuthStatus',
  RequireLogout = 'user/requireLogout',
  SetUserEmail = 'user/setUserEmail',
  SetActiveCity = 'data/setActiveCity',
  SetOffers = 'data/setOffers',
  SetCities = 'data/SetCities',
  SetSortingType = 'data/setSortingType',
  SetReviews = 'data/setReviews',
}

export type Actions =
  ReturnType<typeof setAuthStatus> |
  ReturnType<typeof requireLogout> |
  ReturnType<typeof setUserEmail> |
  ReturnType<typeof setActiveCity> |
  ReturnType<typeof setOffers> |
  ReturnType<typeof setCities> |
  ReturnType<typeof setSortingType> |
  ReturnType<typeof setReviews>;

export type ThunkActionResult<P = Promise<void>> = ThunkAction<P, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
