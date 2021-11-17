import { AuthStatus, CityName, SortingTypes } from '../const';
import { reviews } from '../mocks/reviews';
import { Actions, ActionType } from '../types/action';
import State from '../types/state';

const initialState = {
  authStatus: AuthStatus.unknown,
  activeCity: CityName.Paris,
  cities: {},
  offers: [],
  suggestedOffers: [],
  sortingType: SortingTypes.popular,
  reviews: reviews,
  isOffersLoaded: false,
  userEmail: '',
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

    case ActionType.SetSuggestedOffers:
      return { ...state, suggestedOffers: action.payload};

    case ActionType.SetCities:
      return { ...state, cities: action.payload};

    case ActionType.SetSortingType:
      return { ...state, sortingType: action.payload};

    case ActionType.SetReviews:
      return { ...state, reviews: action.payload};

    case ActionType.SetUserEmail:
      return { ...state, userEmail: action.payload};

    default:
      return state;
  }
};

export default reducer;
