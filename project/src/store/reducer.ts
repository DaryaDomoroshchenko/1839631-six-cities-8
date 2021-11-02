import { CityName } from '../const';
import { roomOffers } from '../mocks/room-offers';
import { Actions, ActionType } from '../types/action';
import State from '../types/state';
import { getCities } from '../utils';

const initialState = {
  activeCity: CityName.Paris,
  offers: roomOffers,
  cities: getCities(roomOffers),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetActiveCity:
      return { ...state, activeCity: action.payload};
    case ActionType.SetOffers:
      return { ...state, offers: action.payload};
    default:
      return state;
  }
};

export default reducer;
