import { AuthStatus, CityName, SortingTypes } from '../const';
import { reviews } from '../mocks/reviews';
import { roomOffers } from '../mocks/room-offers';
import { Actions, ActionType } from '../types/action';
import State from '../types/state';

const initialState = {
  authStatus: AuthStatus.unknown,
  activeCity: CityName.Paris,
  cities: {},
  offers: [],
  // временно замоканы
  suggestedOffers: roomOffers.slice(0, 3),
  sortingType: SortingTypes.popular,
  reviews: reviews,
  isOffersLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetAuthStatus:
      return { ...state, authStatus: action.payload};

    case ActionType.RequireLogout:
      return { ...state, authStatus: AuthStatus.noAuth};

    case ActionType.SetActiveCity:
      return { ...state, activeCity: action.payload};

    case ActionType.SetOffers:
      return { ...state, offers: action.payload, isOffersLoaded: true};

    case ActionType.SetCities:
      return { ...state, cities: action.payload};

    case ActionType.SetSortingType:
      return { ...state, sortingType: action.payload};

    case ActionType.SetReviews:
      return { ...state, reviews: action.payload};

    default:
      return state;
  }
};

export default reducer;
