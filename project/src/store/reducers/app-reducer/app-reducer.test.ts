import { CityName } from '../../../const';
import { appState } from '../../../types/state';
import { makeCitiesMock } from '../../../utils/mocks';
import { setActiveCity, setCities } from '../../actions/app-actions';
import appReducer from './app-reducer';

const initialState: appState = {
  activeCity: CityName.Paris,
  cities: {},
};

describe('Reducer: appReducer', () => {
  it('should set active city', () => {
    const activeCity = CityName.Paris;
    expect(appReducer(initialState, setActiveCity(activeCity)))
      .toEqual({
        ...initialState,
        activeCity,
      });
  });
  it('should set cities', () => {
    const cities = makeCitiesMock();
    expect(appReducer(initialState, setCities(cities)))
      .toEqual({
        ...initialState,
        cities,
      });
  });
});
