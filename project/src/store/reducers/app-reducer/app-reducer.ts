import { CityName, SortingTypes } from '../../../const';
import { Actions, ActionType } from '../../../types/action';
import { appState } from '../../../types/state';

const initialState: appState = {
  activeCity: CityName.Paris,
  cities: {},
  sortingType: SortingTypes.popular,
};

const appReducer = (state = initialState, action: Actions): appState => {
  switch (action.type) {
    case ActionType.SetActiveCity:
      return { ...state, activeCity: action.payload};

    case ActionType.SetCities:
      return { ...state, cities: action.payload};

    case ActionType.SetSortingType:
      return { ...state, sortingType: action.payload};

    default:
      return state;
  }
};

export default appReducer;
