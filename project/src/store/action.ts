import { CityName } from '../const';
import { ActionType, SetActiveCityAction, SetOffersAction } from '../types/action';
import { RoomOffer } from '../types/room-offer';

export const setActiveCity = (activeCity: CityName): SetActiveCityAction => ({
  type: ActionType.SetActiveCity,
  payload: activeCity,
});

export const setOffers = (offers: RoomOffer[]): SetOffersAction => ({
  type: ActionType.SetOffers,
  payload: offers,
});
