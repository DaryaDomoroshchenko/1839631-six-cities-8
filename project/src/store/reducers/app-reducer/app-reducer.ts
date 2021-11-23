import { CityName } from '../../../const';
import { Actions, ActionType } from '../../../types/action';
import { appState } from '../../../types/state';

const initialState: appState = {
  activeCity: CityName.Paris,
  cities: {},
};

const appReducer = (state = initialState, action: Actions): appState => {
  switch (action.type) {
    case ActionType.SetActiveCity:
      return { ...state, activeCity: action.payload};

    case ActionType.SetCities:
      return { ...state, cities: action.payload};

    default:
      return state;
  }
};

export default appReducer;
