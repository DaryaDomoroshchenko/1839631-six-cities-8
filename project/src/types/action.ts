import { CityName } from '../const';
import { RoomOffer } from './room-offer';

export enum ActionType {
  SetActiveCity = 'setActiveCity',
  SetOffers = 'setOffers',
}

export type SetActiveCityAction = {
  type: ActionType.SetActiveCity;
  payload: CityName;
};

export type SetOffersAction = {
  type: ActionType.SetOffers;
  payload: RoomOffer[];
};

export type Actions = SetActiveCityAction | SetOffersAction;
