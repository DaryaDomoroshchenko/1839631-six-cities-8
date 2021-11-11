import { AuthStatus, CityName } from '../const';
import { reviews } from '../mocks/reviews';
import { roomOffers } from '../mocks/room-offers';
import { Actions, ActionType } from '../types/action';
import State from '../types/state';
import { getCities } from '../utils';

const initialState = {
  authStatus: AuthStatus.auth,
  activeCity: CityName.Paris,
  cities: getCities(roomOffers),
  offers: roomOffers,
  // временно замоканы
  suggestedOffers: roomOffers.slice(0, 3),
  reviews: reviews,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetAuthStatus:
      return { ...state, authStatus: action.payload};
    case ActionType.SetActiveCity:
      return { ...state, activeCity: action.payload};
    case ActionType.SetOffers:
      return { ...state, offers: action.payload};
    case ActionType.SetReviews:
      return { ...state, reviews: action.payload};
    default:
      return state;
  }
};

export default reducer;
